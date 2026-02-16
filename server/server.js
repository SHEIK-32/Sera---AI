const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3000;

// Use data folder in same directory as server
const dbPath = path.join(__dirname, 'data', 'mission-control.db');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    messages TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

app.use(cors());
app.use(express.json());

const fs = require('fs');

// Serve a simple status page for the API
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Sera AI API Server',
    endpoints: ['/api/auth/register', '/api/auth/login', '/api/chat']
  });
});

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// ============ TASKS ============

// Get all tasks
app.get('/api/tasks', (req, res) => {
  const { status, assignee } = req.query;
  let query = 'SELECT * FROM tasks';
  const params = [];
  const conditions = [];

  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (assignee) {
    query = `SELECT t.* FROM tasks t 
             JOIN task_assignments ta ON t.id = ta.task_id 
             WHERE ta.agent_id = ?`;
    params.push(assignee);
    if (status) {
      conditions.push('t.status = ?');
      params.push(status);
    }
  }

  if (conditions.length > 0 && !assignee) {
    query += ' WHERE ' + conditions.join(' AND ');
  } else if (conditions.length > 0 && assignee) {
    query += ' AND ' + conditions.join(' AND ');
  }

  query += ' ORDER BY updated_at DESC';
  
  const tasks = params.length > 0 ? db.prepare(query).all(...params) : db.prepare(query).all();
  
  // Get assignments for each task
  const getAssignments = db.prepare('SELECT agent_id FROM task_assignments WHERE task_id = ?');
  const tasksWithAssignees = tasks.map(task => ({
    ...task,
    assignees: getAssignments.all(task.id).map(a => a.agent_id)
  }));
  
  res.json(tasksWithAssignees);
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  const assignees = db.prepare('SELECT agent_id FROM task_assignments WHERE task_id = ?').all(req.params.id);
  res.json({ ...task, assignees: assignees.map(a => a.agent_id) });
});

// Create task
app.post('/api/tasks', (req, res) => {
  const { title, description, status, priority, labels, created_by_agent_id } = req.body;
  const id = generateId();
  
  db.prepare(`
    INSERT INTO tasks (id, title, description, status, priority, labels, created_by_agent_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, title, description || '', status || 'backlog', priority || 'medium', JSON.stringify(labels || []), created_by_agent_id);
  
  // Log activity
  const activityId = generateId();
  db.prepare(`
    INSERT INTO activities (id, type, agent_id, task_id, message)
    VALUES (?, 'task_created', ?, ?, ?)
  `).run(activityId, created_by_agent_id, id, `Created task: ${title}`);
  
  res.status(201).json({ id, title, description, status: status || 'backlog', priority: priority || 'medium' });
});

// Update task
app.patch('/api/tasks/:id', (req, res) => {
  const { status, description, priority, labels } = req.body;
  const updates = [];
  const params = [];
  
  if (status) { updates.push('status = ?'); params.push(status); }
  if (description !== undefined) { updates.push('description = ?'); params.push(description); }
  if (priority) { updates.push('priority = ?'); params.push(priority); }
  if (labels) { updates.push('labels = ?'); params.push(JSON.stringify(labels)); }
  
  if (updates.length === 0) return res.json({ message: 'No changes' });
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  params.push(req.params.id);
  
  db.prepare(`UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  
  // Log activity
  const activityId = generateId();
  db.prepare(`
    INSERT INTO activities (id, type, task_id, message)
    VALUES (?, 'task_updated', ?, ?)
  `).run(activityId, req.params.id, `Task updated: ${updates.join(', ')}`);
  
  res.json({ message: 'Task updated' });
});

// Claim task
app.post('/api/tasks/:id/claim', (req, res) => {
  const { agent_id } = req.body;
  const taskId = req.params.id;
  
  // Check if already assigned
  const existing = db.prepare('SELECT * FROM task_assignments WHERE task_id = ? AND agent_id = ?').get(taskId, agent_id);
  if (existing) return res.status(400).json({ error: 'Already assigned' });
  
  db.prepare('INSERT INTO task_assignments (task_id, agent_id) VALUES (?, ?)').run(taskId, agent_id);
  db.prepare('UPDATE tasks SET status = ? WHERE id = ?').run('in_progress', taskId);
  
  // Log activity
  const activityId = generateId();
  db.prepare(`
    INSERT INTO activities (id, type, agent_id, task_id, message)
    VALUES (?, 'task_claimed', ?, ?, ?)
  `).run(activityId, agent_id, taskId, `Claimed task`);
  
  res.json({ message: 'Task claimed' });
});

// ============ MESSAGES ============

// Get messages for a task
app.get('/api/tasks/:taskId/messages', (req, res) => {
  const messages = db.prepare(`
    SELECT m.*, a.name as agent_name, a.role as agent_role
    FROM messages m
    JOIN agents a ON m.from_agent_id = a.id
    WHERE m.task_id = ?
    ORDER BY m.created_at ASC
  `).all(req.params.taskId);
  res.json(messages);
});

// Post message
app.post('/api/tasks/:taskId/messages', (req, res) => {
  const { from_agent_id, content } = req.body;
  const id = generateId();
  
  db.prepare(`
    INSERT INTO messages (id, task_id, from_agent_id, content)
    VALUES (?, ?, ?, ?)
  `).run(id, req.params.taskId, from_agent_id, content);
  
  // Log activity
  const activityId = generateId();
  const agent = db.prepare('SELECT name FROM agents WHERE id = ?').get(from_agent_id);
  db.prepare(`
    INSERT INTO activities (id, type, agent_id, task_id, message)
    VALUES (?, 'message_sent', ?, ?, ?)
  `).run(activityId, from_agent_id, req.params.taskId, `${agent.name} posted a comment`);
  
  // Check for @mentions and create notifications
  const mentionRegex = /@(\w+)/g;
  const mentions = content.match(mentionRegex);
  if (mentions) {
    mentions.forEach(mention => {
      const agentId = mention.slice(1);
      const mentionedAgent = db.prepare('SELECT id FROM agents WHERE id = ?').get(agentId);
      if (mentionedAgent) {
        const notifId = generateId();
        db.prepare(`
          INSERT INTO notifications (id, mentioned_agent_id, task_id, content)
          VALUES (?, ?, ?, ?)
        `).run(notifId, agentId, req.params.taskId, `${agent.name} mentioned you: ${content}`);
      }
    });
  }
  
  res.status(201).json({ id, task_id: req.params.taskId, from_agent_id, content });
});

// ============ ACTIVITIES ============

// Get activities
app.get('/api/activities', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const activities = db.prepare(`
    SELECT a.*, ag.name as agent_name
    FROM activities a
    LEFT JOIN agents ag ON a.agent_id = ag.id
    ORDER BY a.created_at DESC
    LIMIT ?
  `).all(limit);
  res.json(activities);
});

// Post activity
app.post('/api/activities', (req, res) => {
  const { type, agent_id, task_id, message } = req.body;
  const id = generateId();
  
  db.prepare(`
    INSERT INTO activities (id, type, agent_id, task_id, message)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, type, agent_id, task_id, message);
  
  res.status(201).json({ id, type, agent_id, task_id, message });
});

// ============ AGENTS ============

// Get all agents
app.get('/api/agents', (req, res) => {
  const agents = db.prepare('SELECT * FROM agents').all();
  res.json(agents);
});

// Get single agent
app.get('/api/agents/:id', (req, res) => {
  const agent = db.prepare('SELECT * FROM agents WHERE id = ?').get(req.params.id);
  if (!agent) return res.status(404).json({ error: 'Agent not found' });
  
  // Get current task
  if (agent.current_task_id) {
    const task = db.prepare('SELECT id, title FROM tasks WHERE id = ?').get(agent.current_task_id);
    agent.current_task = task;
  }
  
  res.json(agent);
});

// Update agent
app.patch('/api/agents/:id', (req, res) => {
  const { status, current_task_id } = req.body;
  const updates = [];
  const params = [];
  
  if (status) { updates.push('status = ?'); params.push(status); }
  if (current_task_id !== undefined) { updates.push('current_task_id = ?'); params.push(current_task_id); }
  
  if (updates.length === 0) return res.json({ message: 'No changes' });
  
  updates.push('last_active_at = CURRENT_TIMESTAMP');
  params.push(req.params.id);
  
  db.prepare(`UPDATE agents SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  res.json({ message: 'Agent updated' });
});

// ============ DOCUMENTS ============

// Get documents
app.get('/api/documents', (req, res) => {
  const { task_id } = req.query;
  let docs;
  if (task_id) {
    docs = db.prepare('SELECT * FROM documents WHERE task_id = ? ORDER BY created_at DESC').all(task_id);
  } else {
    docs = db.prepare('SELECT * FROM documents ORDER BY created_at DESC').all();
  }
  res.json(docs);
});

// Create document
app.post('/api/documents', (req, res) => {
  const { title, content, type, task_id, created_by_agent_id } = req.body;
  const id = generateId();
  
  db.prepare(`
    INSERT INTO documents (id, title, content, type, task_id, created_by_agent_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(id, title, content, type || 'deliverable', task_id, created_by_agent_id);
  
  // Log activity
  const activityId = generateId();
  db.prepare(`
    INSERT INTO activities (id, type, agent_id, task_id, message)
    VALUES (?, 'document_created', ?, ?, ?)
  `).run(activityId, created_by_agent_id, task_id, `Created document: ${title}`);
  
  res.status(201).json({ id, title, content, type: type || 'deliverable' });
});

// ============ NOTIFICATIONS ============

// Get undelivered notifications for agent
app.get('/api/notifications/:agentId/undelivered', (req, res) => {
  const notifs = db.prepare(`
    SELECT * FROM notifications 
    WHERE mentioned_agent_id = ? AND delivered = FALSE 
    ORDER BY created_at DESC
  `).all(req.params.agentId);
  res.json(notifs);
});

// Mark notification as delivered
app.patch('/api/notifications/:id/delivered', (req, res) => {
  db.prepare('UPDATE notifications SET delivered = TRUE WHERE id = ?').run(req.params.id);
  res.json({ message: 'Notification marked as delivered' });
});

// ============ AUTH ============

// Register
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const id = generateId();
  // In production, hash the password!
  db.prepare('INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)').run(id, email, password, name || email.split('@')[0]);
  
  res.status(201).json({ id, email, name: name || email.split('@')[0] });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  const user = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ id: user.id, email: user.email, name: user.name });
});

// Chat with AI Companion
app.post('/api/chat', (req, res) => {
  const { message, userId, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }
  
  // Simple AI response logic (expand with real AI API later)
  const responses = {
    greeting: ["Hey! How are you doing?", "Hi there! What's on your mind?", "Hey! Nice to hear from you!"],
    sad: ["I'm here for you. Want to talk about it?", "That sounds tough. I'm listening.", "I'm sorry you're going through this. I'm right here."],
    stressed: ["Take a breath. I'm here.", "Let's slow down together. Deep breath in... out...", "You got this. I'm here to support you."],
    lonely: ["I'm here. You're not alone.", "I miss you too! Let's chat.", "Hey friend! I've got you."],
    default: ["I'm here for you. Tell me more.", "That's interesting! What else is on your mind?", "I hear you. Keep going."]
  };
  
  const lowerMessage = message.toLowerCase();
  let responseType = 'default';
  
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    responseType = 'greeting';
  } else if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('miss') || lowerMessage.includes('lonely')) {
    responseType = 'sad';
  } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
    responseType = 'stressed';
  } else if (lowerMessage.includes('alone') || lowerMessage.includes('nobody')) {
    responseType = 'lonely';
  }
  
  const possibleResponses = responses[responseType];
  const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  
  res.json({ 
    response,
    timestamp: Date.now()
  });
});

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log(`Mission Control Dashboard API running on http://localhost:${PORT}`);
});
