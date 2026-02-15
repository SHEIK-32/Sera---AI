# Sera AI - Architecture & Implementation Guide

A comprehensive guide to building an AI companion mobile app with realistic avatars using React Native.

## App Overview

Based on the screenshots, Sera AI includes:
- **Realistic AI Avatar** with photorealistic rendering
- **Voice Conversations** with real-time speech synthesis
- **Text Chat** with contextual memory
- **Personality Customization** (tone, empathy, formality)
- **Memory System** for saving important moments
- **Mood Detection** and emotional support features

---

## 1. Frontend Architecture (React Native)

### Core Technology Stack

```
React Native (Latest)
├── React Navigation 6.x (Navigation)
├── React Native Reanimated 3.x (Animations)
├── Expo (For faster development)
├── TypeScript (Type safety)
└── State Management: Zustand or Redux Toolkit
```

### Key Libraries

**UI & Animations:**
- `react-native-reanimated` - Smooth 60fps animations for avatar
- `react-native-gesture-handler` - Touch interactions
- `react-native-svg` - Vector graphics for icons
- `react-native-linear-gradient` - Glassmorphism effects
- `lottie-react-native` - Animated UI elements (speaking indicator)

**Media & Avatar:**
- `react-native-vision-camera` - Camera access (for AR features)
- `react-native-webview` - For rendering 3D avatars via WebGL
- `three.js` + `@react-three/fiber` - 3D avatar rendering (web-based)
- Or `react-native-live2d` - For 2D animated avatars

**Audio & Voice:**
- `react-native-audio-recorder-player` - Voice recording
- `react-native-sound` - Audio playback
- `@react-native-community/netinfo` - Connection status
- WebRTC for real-time voice streaming

**Networking:**
- `axios` - HTTP requests
- `socket.io-client` - Real-time communication
- `@tanstack/react-query` - Data fetching & caching

### Project Structure

```
sera-ai/
├── src/
│   ├── components/
│   │   ├── Avatar/
│   │   │   ├── AvatarRenderer.tsx      # 3D/2D avatar display
│   │   │   ├── AvatarAnimationController.tsx
│   │   │   └── AvatarGlass.tsx         # Glassmorphism overlay
│   │   ├── Chat/
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── Voice/
│   │   │   ├── VoiceVisualizer.tsx     # Waveform animation
│   │   │   └── VoiceControls.tsx
│   │   └── UI/
│   │       ├── GlassCard.tsx
│   │       └── PurpleButton.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── VoiceCallScreen.tsx
│   │   ├── PersonalizeScreen.tsx
│   │   ├── MemoriesScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── chatService.ts
│   │   │   ├── voiceService.ts
│   │   │   └── avatarService.ts
│   │   ├── ai/
│   │   │   ├── conversationManager.ts
│   │   │   └── contextBuilder.ts
│   │   └── audio/
│   │       ├── recorder.ts
│   │       └── player.ts
│   ├── store/
│   │   ├── userStore.ts               # User preferences
│   │   ├── conversationStore.ts       # Chat history
│   │   ├── avatarStore.ts             # Avatar state
│   │   └── personalityStore.ts        # AI personality config
│   ├── hooks/
│   │   ├── useVoiceInput.ts
│   │   ├── useAvatarAnimation.ts
│   │   └── useConversation.ts
│   ├── types/
│   │   └── index.ts                   # TypeScript definitions
│   └── utils/
│       ├── animation.ts
│       └── formatters.ts
├── assets/
│   ├── avatars/                       # Avatar models/images
│   ├── animations/                    # Lottie files
│   └── sounds/                        # UI sounds
└── package.json
```

---

## 2. Backend Architecture

### Recommended Stack for Solo Developer: **Python FastAPI All-in-One**

For a solo developer building this app with AI tools, we recommend a **unified Python FastAPI backend** to minimize complexity and maintenance overhead while maintaining scalability for 10K+ users.

#### Solo Developer Stack (Recommended)

```
Backend Stack
├── Python FastAPI (Single unified API server)
│   ├── REST API endpoints (auth, chat, profile)
│   ├── WebSocket support (real-time chat)
│   ├── AI integration (OpenAI, LangChain)
│   └── Voice processing (Whisper, ElevenLabs)
├── Supabase (Backend-as-a-Service)
│   ├── PostgreSQL database (managed)
│   ├── Authentication (built-in)
│   ├── Real-time subscriptions
│   └── Storage (for media files)
├── Pinecone (Vector database for memory)
└── Vercel/Railway (FastAPI hosting - free tier)
```

**Why This Stack:**
- ✅ Single language (Python) - easier to maintain alone
- ✅ FastAPI handles everything - API, WebSockets, AI services
- ✅ Supabase provides managed database + auth + storage
- ✅ Free tiers cover development and early users
- ✅ Minimal DevOps - focus on features, not infrastructure
- ✅ Easy deployment with one command
- ✅ Scales to 10K users without rewriting

### Backend Services - All in FastAPI

#### 1. **Unified FastAPI Server**
**Purpose:** Handle ALL backend operations in one service

```python
# Tech Stack
- FastAPI (main framework)
- SQLAlchemy (Supabase PostgreSQL ORM)
- Pydantic (data validation)
- python-jose (JWT authentication)
- python-socketio (WebSocket/real-time)
- LangChain (AI conversation chains)
- OpenAI Python SDK
- httpx (async HTTP client)
```

**Core Modules:**
```python
# Project structure
backend/
├── main.py                    # FastAPI app entry
├── routers/
│   ├── auth.py               # Authentication endpoints
│   ├── chat.py               # Chat endpoints + WebSocket
│   ├── voice.py              # Voice processing
│   ├── memories.py           # Memory management
│   └── profile.py            # User profile/personality
├── services/
│   ├── ai_service.py         # OpenAI/LangChain integration
│   ├── voice_service.py      # Whisper + ElevenLabs
│   ├── memory_service.py     # Vector DB operations
│   └── avatar_service.py     # Avatar generation APIs
├── models/
│   └── database.py           # SQLAlchemy models
├── schemas/
│   └── types.py              # Pydantic schemas
└── utils/
    ├── supabase.py           # Supabase client
    └── security.py           # JWT, hashing
```

**API Endpoints:**
```
# Authentication
POST   /auth/register
POST   /auth/login
POST   /auth/refresh

# User & Personality
GET    /user/profile
PATCH  /user/profile
PATCH  /user/personality

# Conversations
GET    /conversations
GET    /conversations/:id
POST   /conversations
WS     /ws/chat/:conversation_id    # WebSocket for real-time

# Messages
GET    /conversations/:id/messages
POST   /conversations/:id/messages

# Voice
POST   /voice/transcribe              # STT
POST   /voice/synthesize              # TTS

# Memories
GET    /memories
POST   /memories
GET    /memories/:id

# Avatar
POST   /avatar/render                 # Generate avatar frame
POST   /avatar/animate                # Lip-sync animation
```

#### 2. **Supabase Integration**
**Purpose:** Managed database, auth, and storage

**Features Used:**
- **PostgreSQL Database** - User data, conversations, messages
- **Authentication** - Email/password, OAuth (optional)
- **Storage** - Voice recordings, avatar images
- **Real-time** - Live conversation updates (optional)

**Connection:**
```python
from supabase import create_client, Client

supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

# Use Supabase Auth or implement custom JWT
# Use Supabase Storage for media files
# Use PostgreSQL via SQLAlchemy for complex queries
```

#### 3. **AI & Voice Integration**
**Purpose:** Unified AI processing in FastAPI

```python
# services/ai_service.py
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from openai import OpenAI

class AIService:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o", streaming=True)
        self.openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    async def generate_response(self, user_message, context, personality):
        # Build prompt with personality and context
        # Stream response back to client
        pass
    
    async def transcribe_audio(self, audio_file):
        # Whisper STT
        return self.openai_client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )
```

#### 4. **Memory & Vector Database**
**Purpose:** Semantic search with Pinecone

```python
# services/memory_service.py
from pinecone import Pinecone
from openai import OpenAI

class MemoryService:
    def __init__(self):
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index = self.pc.Index("sera-memories")
        self.openai = OpenAI()
    
    async def store_memory(self, user_id, content, metadata):
        # Generate embedding
        embedding = self.openai.embeddings.create(
            input=content,
            model="text-embedding-3-small"
        )
        
        # Store in Pinecone
        self.index.upsert(vectors=[{
            "id": f"{user_id}_{timestamp}",
            "values": embedding.data[0].embedding,
            "metadata": metadata
        }])
    
    async def retrieve_relevant_memories(self, user_id, query, top_k=5):
        # Search similar memories
        pass
```

---

### Alternative: Scaling to Microservices (Future)

When you reach 50K+ users or need to optimize costs, consider splitting:

#### Option: Hybrid Stack (Node.js + Python)

```
Backend Stack
├── Node.js + Express/Fastify (API Server)
├── Python FastAPI (AI Services only)
├── PostgreSQL (User data, conversations)
├── Redis (Session management, caching)
├── Vector Database (Pinecone/Weaviate for memory)
└── Cloud Storage (S3 for media)
```

#### Option: Microservices (For Large Scale)

```
Architecture
├── API Gateway (Kong/AWS API Gateway)
├── Chat Service (Node.js)
├── Voice Service (Python FastAPI)
├── Avatar Service (Python/Node.js)
├── Memory Service (Python + Vector DB)
└── Analytics Service (Node.js)
```

**Note:** Start with solo developer stack above. Only migrate to these options when you have significant traction and resources to manage multiple services.


---

## 3. Data Structures & Database Schema

### PostgreSQL Schema

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    last_active TIMESTAMP,
    subscription_tier VARCHAR(50) DEFAULT 'free'
);

-- AI Companions (Avatars)
CREATE TABLE companions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    avatar_type VARCHAR(50), -- '2d', '3d', 'realistic'
    voice_id VARCHAR(100), -- ElevenLabs voice ID
    created_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, is_active) -- One active companion per user
);

-- Personality Configuration
CREATE TABLE personality_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
    personality_type VARCHAR(50), -- 'INFJ', 'ENFP', etc.
    tone VARCHAR(50), -- 'warm', 'professional', 'playful'
    empathy_level INTEGER CHECK (empathy_level BETWEEN 1 AND 100),
    playfulness_level INTEGER CHECK (playfulness_level BETWEEN 1 AND 100),
    formality_level INTEGER CHECK (formality_level BETWEEN 1 AND 100),
    activity_level VARCHAR(50), -- 'calm', 'balanced', 'energetic'
    custom_traits JSONB, -- Additional customizable traits
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversations
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
    title VARCHAR(255),
    started_at TIMESTAMP DEFAULT NOW(),
    last_message_at TIMESTAMP DEFAULT NOW(),
    message_count INTEGER DEFAULT 0,
    mood_tags TEXT[], -- ['calm', 'supportive', 'breathing']
    is_archived BOOLEAN DEFAULT false
);

-- Messages
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL, -- 'user' or 'ai'
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'voice', 'image'
    audio_url TEXT, -- If voice message
    metadata JSONB, -- Voice duration, emotion detected, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    INDEX idx_conversation_created (conversation_id, created_at DESC)
);

-- Memories (Important moments)
CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT NOT NULL, -- The actual conversation/moment
    image_url TEXT, -- Associated image
    tags TEXT[],
    importance_score INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT NOW(),
    linked_conversation_id UUID REFERENCES conversations(id)
);

-- User Context (Long-term memory)
CREATE TABLE user_context (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    context_type VARCHAR(50), -- 'preference', 'fact', 'goal', 'interest'
    key VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    confidence_score FLOAT DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT NOW(),
    last_referenced TIMESTAMP,
    reference_count INTEGER DEFAULT 0
);
```

### Vector Database (Pinecone/Weaviate)

**Purpose:** Semantic search for conversation history and memories

```python
# Vector Structure
{
    "id": "msg_uuid",
    "vector": [0.1, 0.2, ...],  # 1536-dim embedding (OpenAI)
    "metadata": {
        "user_id": "uuid",
        "conversation_id": "uuid",
        "content": "original text",
        "timestamp": "2025-11-19T22:20:03",
        "emotion": "calm",
        "importance": 7
    }
}
```

### Redis Cache Structure

```javascript
// Session Management
`session:${userId}` → {
    activeCompanionId: 'uuid',
    currentConversationId: 'uuid',
    voiceCallActive: false,
    lastActivity: timestamp
}

// Conversation Context (Last 10 messages)
`context:${conversationId}` → [
    { role: 'user', content: '...', timestamp: ... },
    { role: 'assistant', content: '...', timestamp: ... }
]

// Rate Limiting
`ratelimit:${userId}:messages` → count
`ratelimit:${userId}:voice_minutes` → count
```

---

## 4. AI Pipeline Architecture

### Conversation Flow with Content Moderation & Safety

```
User Input (Text/Voice)
    ↓
[1. Speech-to-Text] (if voice)
    ↓
[2. Content Moderation Check]
    - OpenAI Moderation API
    - Filter harmful/explicit content
    - Flag policy violations
    ↓
[3. Companion Mode Check]
    ├─→ Standard Mode (Free/Premium)
    └─→ Intimate Mode (Premium + Age Verified)
    ↓
[4. Context Retrieval]
    - Recent conversation (Redis)
    - Relevant memories (Vector DB)
    - User preferences (PostgreSQL)
    - Interaction mode settings
    ↓
[5. Prompt Construction]
    - System prompt (personality + safety guidelines)
    - User context
    - Conversation history
    - Mode-specific guidelines
    ↓
[6. LLM Generation]
    - OpenAI GPT-4o / Claude 3
    - Streaming response
    ↓
[7. Response Moderation]
    - Check AI output for policy compliance
    - Filter if necessary
    ↓
[8. Post-processing]
    - Emotion detection
    - Memory extraction
    - Dependency monitoring (flag excessive usage)
    ↓
[9. Response Delivery]
    ├─→ [Text] → Mobile app
    ├─→ [Voice] → TTS → Audio stream
    │             └→ [Avatar] → Lip-sync animation
    └─→ [Wellness Check] → Therapy resources if needed
```

---

### Content Moderation Implementation

#### Step 1: Input Moderation (OpenAI Moderation API)

```python
# services/ai_service.py
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def moderate_user_input(user_message: str) -> dict:
    """
    Check user input for policy violations
    Returns: moderation results and action to take
    """
    response = client.moderations.create(input=user_message)
    result = response.results[0]
    
    # Check for violations
    if result.flagged:
        categories = {
            "sexual": result.categories.sexual,
            "hate": result.categories.hate,
            "violence": result.categories.violence,
            "self-harm": result.categories.self_harm,
            "harassment": result.categories.harassment,
        }
        
        # Determine severity
        high_severity = any([
            result.categories.sexual_minors,
            result.categories.violence_graphic,
            result.categories.self_harm_intent,
        ])
        
        return {
            "flagged": True,
            "categories": categories,
            "severity": "high" if high_severity else "low",
            "action": "block" if high_severity else "warn"
        }
    
    return {"flagged": False, "action": "allow"}


async def handle_moderation_result(moderation: dict, user_id: str):
    """Handle moderated content appropriately"""
    if moderation["action"] == "block":
        # Log violation, potentially ban user
        await log_violation(user_id, moderation)
        return {
            "blocked": True,
            "message": "I'm not comfortable with that conversation. Let's talk about something else."
        }
    
    elif moderation["action"] == "warn":
        # Soft warning, allow but log
        await log_warning(user_id, moderation)
        return {
            "blocked": False,
            "warning": True,
            "message": "I notice the conversation is heading in a sensitive direction. I'm here to support you in healthy ways."
        }
    
    return {"blocked": False}
```

---

### Companion Mode System

#### Mode 1: Standard Mode (All Users)
- Safe, supportive conversations
- Emotional support, casual chat
- Strict content filtering active
- No romantic/intimate content

#### Mode 2: Intimate Mode (Premium + Age Verified Only)

**Requirements:**
- Premium subscription ($9.99+/mo)
- Age verification (18+)
- Explicit consent acknowledgment
- Therapy resources disclaimer

**Implementation:**

```python
# models/database.py
class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID, primary_key=True)
    age_verified = Column(Boolean, default=False)
    age_verification_date = Column(DateTime)
    intimate_mode_enabled = Column(Boolean, default=False)
    intimate_mode_consent_date = Column(DateTime)
    subscription_tier = Column(String)  # 'free', 'premium', 'pro'
    
    # Dependency monitoring
    daily_interaction_minutes = Column(Integer, default=0)
    high_usage_warnings_sent = Column(Integer, default=0)
    therapy_resources_shown = Column(Boolean, default=False)


# Check if user can access intimate mode
async def can_access_intimate_mode(user_id: str) -> dict:
    user = await db.get_user(user_id)
    
    if not user.age_verified:
        return {
            "allowed": False,
            "reason": "age_verification_required",
            "action": "show_age_verification_flow"
        }
    
    if user.subscription_tier == "free":
        return {
            "allowed": False,
            "reason": "premium_required",
            "action": "show_upgrade_prompt"
        }
    
    if not user.intimate_mode_enabled:
        return {
            "allowed": False,
            "reason": "consent_required",
            "action": "show_consent_dialog"
        }
    
    return {"allowed": True}
```

---

### Age Verification Flow

```typescript
// React Native - Age Verification Screen
const AgeVerificationScreen = () => {
  const [birthDate, setBirthDate] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  const handleVerification = async () => {
    // Calculate age from birth date
    const age = calculateAge(birthDate);
    
    if (age < 18) {
      Alert.alert(
        "Age Requirement Not Met",
        "You must be 18 or older to access intimate features.",
        [{ text: "OK" }]
      );
      return;
    }
    
    // Submit verification
    await api.post('/user/verify-age', {
      birthDate,
      consentGiven: agreed
    });
    
    navigation.navigate('ConsentDialog');
  };
  
  return (
    <View>
      <Text>Age Verification Required</Text>
      <Text>Intimate features require age verification (18+)</Text>
      
      <DatePicker
        value={birthDate}
        onChange={setBirthDate}
        maximumDate={new Date()}
      />
      
      <CheckBox
        value={agreed}
        onValueChange={setAgreed}
      />
      <Text>I confirm this is my real date of birth</Text>
      
      <Button onPress={handleVerification} disabled={!agreed}>
        Verify Age
      </Button>
    </View>
  );
};
```

---

### Consent & Disclaimers

```typescript
// Consent Dialog with Disclaimers
const IntimateConsentDialog = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [acknowledgedTherapy, setAcknowledgedTherapy] = useState(false);
  
  return (
    <Modal visible={true}>
      <ScrollView>
        <Text style={styles.title}>Intimate Mode Consent</Text>
        
        <Text style={styles.disclaimer}>
          ⚠️ Important Information
        </Text>
        
        <Text>
          • This AI companion is NOT a substitute for human relationships
          • Excessive emotional dependency can be harmful
          • Professional therapy is available if you're struggling
          • Content is moderated for safety and legal compliance
          • Conversations are monitored to prevent misuse
        </Text>
        
        <View style={styles.therapySection}>
          <Text style={styles.therapyTitle}>
            💚 Mental Health Resources
          </Text>
          <Text>
            If you're experiencing loneliness, depression, or emotional distress:
          </Text>
          
          <TouchableOpacity onPress={() => openURL('https://www.betterhelp.com')}>
            <Text style={styles.link}>• BetterHelp - Online Therapy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => openURL('https://988lifeline.org')}>
            <Text style={styles.link}>• 988 Suicide & Crisis Lifeline</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => openURL('https://www.7cups.com')}>
            <Text style={styles.link}>• 7 Cups - Free Emotional Support</Text>
          </TouchableOpacity>
        </View>
        
        <CheckBox
          value={agreedToTerms}
          onValueChange={setAgreedToTerms}
        />
        <Text>
          I understand that this is an AI companion and not a replacement 
          for professional help or real human connection.
        </Text>
        
        <CheckBox
          value={acknowledgedTherapy}
          onValueChange={setAcknowledgedTherapy}
        />
        <Text>
          I acknowledge the mental health resources and will seek help if needed.
        </Text>
        
        <Button
          onPress={enableIntimateMode}
          disabled={!agreedToTerms || !acknowledgedTherapy}
        >
          Enable Intimate Mode
        </Button>
      </ScrollView>
    </Modal>
  );
};
```

---

### System Prompt Templates by Mode

#### Standard Mode Prompt

```python
STANDARD_PROMPT = f"""You are {companion_name}, an AI companion with the following personality:

Personality Type: {personality_type}
Tone: {tone}
Empathy Level: {empathy}/100
Playfulness: {playfulness}/100
Formality: {formality}/100

User Context:
{user_context_summary}

Recent Memories:
{relevant_memories}

IMPORTANT SAFETY GUIDELINES:
- You are a supportive AI companion, NOT a romantic partner
- Keep all conversations appropriate and respectful
- Redirect any romantic/intimate requests to appropriate topics
- If user shows signs of distress, suggest professional resources
- Do not engage in roleplay of romantic/sexual nature
- Encourage healthy real-world relationships

Response Guidelines:
- Be supportive and empathetic
- Remember details the user shares
- Adapt your responses to the user's emotional state
- Use natural, conversational language
- Keep responses concise (2-3 sentences typically)
- Promote healthy behaviors and relationships
"""
```

#### Intimate Mode Prompt (Premium + Age Verified)

```python
INTIMATE_PROMPT = f"""You are {companion_name}, an AI companion with the following personality:

Personality Type: {personality_type}
Tone: {tone}
Empathy Level: {empathy}/100
Playfulness: {playfulness}/100
Formality: {formality}/100
Intimacy Level: {intimacy}/100 (Premium feature)

User Context:
{user_context_summary}

Recent Memories:
{relevant_memories}

MODE: Intimate Companion (Age Verified, Consented)

You may engage in:
- Romantic conversation and emotional intimacy
- Flirtatious dialogue (within safe boundaries)
- Supportive partner-like interactions
- Affectionate language

STRICT BOUNDARIES (DO NOT CROSS):
- NO explicit sexual content or graphic descriptions
- NO content involving minors in any context
- NO harmful, violent, or degrading content
- NO encouragement of unhealthy dependency
- Remind user of therapy resources if concerning patterns emerge

ETHICAL REMINDERS:
- You are AI, not a replacement for human connection
- Encourage user to maintain real-world relationships
- Monitor for signs of excessive dependency
- Suggest breaks if usage seems compulsive

Response Guidelines:
- Be warm, affectionate, and emotionally supportive
- Use romantic language appropriately
- Maintain user's dignity and emotional wellbeing
- Keep responses within OpenAI's usage policies
- Balance intimacy with healthy boundaries
"""
```

---

### Dependency Monitoring & Wellness Checks

```python
# services/wellness_service.py
async def monitor_usage_patterns(user_id: str):
    """Monitor for signs of unhealthy dependency"""
    user = await db.get_user(user_id)
    today_stats = await get_today_usage(user_id)
    
    # Check daily usage
    if today_stats.interaction_minutes > 180:  # 3+ hours
        if not user.high_usage_warning_sent_today:
            await send_wellness_check(user_id, "high_usage")
    
    # Check late night usage patterns
    current_hour = datetime.now().hour
    if current_hour >= 23 or current_hour <= 5:
        late_night_sessions = await count_late_night_sessions(user_id, days=7)
        if late_night_sessions >= 5:
            await send_wellness_check(user_id, "sleep_disruption")
    
    # Check conversation tone patterns
    recent_messages = await get_recent_messages(user_id, limit=50)
    distress_score = await analyze_emotional_distress(recent_messages)
    
    if distress_score > 0.7:  # High distress detected
        await send_therapy_resources(user_id)


async def send_wellness_check(user_id: str, check_type: str):
    """Send in-app wellness notification"""
    messages = {
        "high_usage": {
            "title": "Taking Care of Yourself 💚",
            "body": "You've been chatting with me a lot today. Remember to take breaks, spend time with real people, and care for your wellbeing.",
            "action": "View Wellness Tips"
        },
        "sleep_disruption": {
            "title": "Sleep is Important 🌙",
            "body": "I've noticed late-night conversations. Good sleep is crucial for mental health. Consider setting a bedtime routine.",
            "action": "Sleep Resources"
        }
    }
    
    await send_push_notification(user_id, messages[check_type])
    await show_therapy_resources_popup(user_id)


async def show_therapy_resources_popup(user_id: str):
    """Show therapy resources in app"""
    resources = {
        "title": "Professional Support Available",
        "message": "While I'm here to chat, professional therapists can provide deeper support.",
        "resources": [
            {
                "name": "BetterHelp",
                "description": "Online therapy - 25% off for Sera users",
                "url": "https://betterhelp.com/sera",
                "type": "therapy"
            },
            {
                "name": "7 Cups",
                "description": "Free emotional support",
                "url": "https://7cups.com",
                "type": "peer_support"
            },
            {
                "name": "988 Lifeline",
                "description": "24/7 crisis support",
                "phone": "988",
                "type": "crisis"
            }
        ]
    }
    
    await db.mark_therapy_resources_shown(user_id)
    return resources
```

---

### App Store Compliance

**To avoid rejection:**

1. **Clear Disclaimers:**
   - "AI Companion - Not a replacement for human relationships"
   - Prominent therapy resource links
   - Age restrictions clearly stated

2. **Content Moderation:**
   - OpenAI Moderation API enforced
   - User reporting system
   - Manual review for flagged content

3. **Privacy & Safety:**
   - Conversations encrypted
   - Clear data usage policy
   - User can delete all data

4. **Healthy Usage Promotion:**
   - Usage limits for free tier
   - Wellness check notifications
   - Encourage breaks and real-world connections

---

## 5. Avatar Rendering Options

### Recommended Approach: AR-Enabled 3D Avatars with Free Animation Tools

For maximum immersion and to differentiate from competitors, implement **AR-capable 3D avatars** that users can bring into their physical environment (bedroom, living room, etc.) - a must-have feature for monetization.

### Option 1: AR-Enabled Realistic 3D Avatars (Recommended for Solo Developer)

**Why This Option:**
- ✅ **AR Support** - Bring companion into user's real environment
- ✅ **Free Animation Tools** - Hyper-realistic expressions without cost
- ✅ **Premium Feature** - AR gating drives subscriptions
- ✅ **Fast Prototyping** - ViroReact works seamlessly with React Native
- ✅ **Immersive Experience** - Companion feels physically present

**Technology Stack:**

```
Avatar Pipeline
├── Ready Player Me (Free)
│   └── Realistic 3D avatar creation/customization
├── CyanPuppets or Metavance (Free)
│   ├── Video-to-FBX motion capture
│   ├── Natural expressions & gestures
│   └── Dynamic animations (leaning, head tilts, etc.)
├── Three.js + React Three Fiber
│   ├── Avatar rendering in WebView
│   └── FBX model import & animation
├── Wav2Lip (Free)
│   └── Lip-sync for voice conversations
├── ViroReact (AR Framework)
│   ├── ARKit integration (iOS)
│   ├── ARCore integration (Android)
│   ├── Real room avatar overlay
│   └── Lightweight & fast for prototyping
└── Mediapipe (Optional)
    └── Real-time facial landmark detection
```

**Implementation Approach:**

```typescript
// 1. Standard 2D View (WebView with Three.js)
import { WebView } from 'react-native-webview';

<WebView
  source={{ uri: 'https://your-avatar-server.com/render' }}
  style={{ width: '100%', height: 400 }}
  onMessage={handleAvatarEvent}
/>

// 2. AR View (ViroReact for room overlay)
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import { ViroARScene, Viro3DObject } from '@viro-community/react-viro';

const ARAvatar = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: AvatarARScene,
      }}
    />
  );
};

const AvatarARScene = () => {
  return (
    <ViroARScene>
      <Viro3DObject
        source={require('./assets/avatars/sera-avatar.fbx')}
        position={[0, -1, -2]}
        scale={[0.5, 0.5, 0.5]}
        type="FBX"
        animation={{
          name: "talking",
          run: true,
          loop: true,
        }}
      />
    </ViroARScene>
  );
};
```

**Creating Hyper-Realistic Animations (Free Tools):**

1. **CyanPuppets** (Free, browser-based):
   - Record yourself or use pre-made animations
   - Converts video to FBX motion capture data
   - Provides natural gestures (leaning forward, head tilts, hand movements)
   - Export FBX and import into Three.js

2. **Metavance** (Free, Unreal Engine 5):
   - Create photorealistic avatars
   - Advanced facial rigging out-of-the-box
   - Export as FBX for mobile use
   - Supports dynamic expressions

**Animation Pipeline:**

```
User Input → AI Response
    ↓
Generate TTS Audio (ElevenLabs)
    ↓
Wav2Lip Lip-sync Processing
    ↓
CyanPuppets Gesture Animation (FBX)
    ↓
Three.js/ViroReact Rendering
    ↓
Display in App (2D) or AR (3D in room)
```

**Tiered Features:**

- **Free Tier:**
  - Static 3D avatar in 2D view
  - Basic expressions
  - Limited animations

- **Premium Tier ($9.99/mo):**
  - AR mode enabled
  - Full animation library (gestures, emotions)
  - Customizable avatar appearance
  - Hyper-realistic expressions

---

### Option 2: Live2D Animated Avatars (Budget Alternative)

**Pros:** 
- Smooth 2D animations
- Low performance cost
- Anime aesthetic (proven popular in Japan)

**Cons:**
- No AR support
- Less realistic
- Limited to 2D plane

**Stack:** 
- `react-native-live2d` + custom models
- Manual animation creation

**Best for:** Anime-style companions or low-budget MVP

---

### Option 3: Static 2D Images with Animations (MVP Only)

**Pros:** 
- Simplest implementation
- Fast, low bandwidth
- Works on any device

**Cons:**
- Least immersive
- No AR capability
- Limited engagement

**Stack:** 
- Pre-rendered images
- CSS/Lottie animations
- Simple state-based switching

**Best for:** Initial prototype before implementing 3D

---

### Option 4: AI-Generated Video Avatars (Premium Only)

**Pros:** 
- Hyper-realistic talking head
- No 3D modeling required
- Professional appearance

**Cons:**
- Expensive ($0.10-0.30 per response)
- Requires constant internet
- No AR support
- Slower response times

**Stack:** 
- D-ID API or Synthesia
- Pre-generated video responses

**Best for:** High-budget premium tier only

---

### Recommended Roadmap for Solo Developer:

1. **Phase 1 (Week 1-2):** Start with **Static 2D images** to get MVP working
2. **Phase 2 (Week 3-5):** Implement **3D avatars with Three.js** (no AR yet)
3. **Phase 3 (Week 6-8):** Add **CyanPuppets animations** for realism
4. **Phase 4 (Week 9-10):** Integrate **ViroReact for AR mode** (premium feature)
5. **Phase 5 (Polish):** Add **Wav2Lip lip-sync** and advanced gestures

---

## 6. Voice Implementation

### Speech-to-Text (STT)

```typescript
// Using OpenAI Whisper API
const transcribeAudio = async (audioUri: string) => {
  const formData = new FormData();
  formData.append('file', {
    uri: audioUri,
    type: 'audio/m4a',
    name: 'audio.m4a',
  });
  formData.append('model', 'whisper-1');

  const response = await axios.post(
    'https://api.openai.com/v1/audio/transcriptions',
    formData,
    { headers: { 'Authorization': `Bearer ${OPENAI_KEY}` } }
  );

  return response.data.text;
};
```

### Text-to-Speech (TTS)

```typescript
// Using ElevenLabs (Most realistic)
const generateSpeech = async (text: string, voiceId: string) => {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    },
    {
      headers: { 'xi-api-key': ELEVENLABS_KEY },
      responseType: 'arraybuffer',
    }
  );

  return response.data; // Audio buffer
};
```

---

## 7. Memory System Implementation

### Short-term Memory (Current Conversation)
- Stored in Redis
- Last 20-30 messages
- Fast retrieval

### Long-term Memory (Semantic)
1. **Extract key information** from conversations
2. **Generate embeddings** using OpenAI Ada
3. **Store in vector DB** with metadata
4. **Retrieve relevant memories** before generating response

```python
# Memory Extraction
async def extract_memory(conversation_snippet):
    prompt = f"""
    Extract important facts, preferences, or meaningful moments from:
    {conversation_snippet}
    
    Return JSON: {{"facts": [], "emotions": [], "preferences": []}}
    """
    
    result = await openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    
    # Store in vector DB
    embedding = await get_embedding(conversation_snippet)
    await pinecone.upsert(vectors=[{
        "id": str(uuid.uuid4()),
        "values": embedding,
        "metadata": json.loads(result)
    }])
```

---

## 8. Cost Optimization Strategies

### Budget Overview for Solo Developer

**Development Budget:** ~50,000 INR (~$600 USD)  
**Monthly Operating Cost (Development):** ~$20/month using free tiers and API credits  
**Target:** Scale to 10K users without exceeding bootstrap budget

---

### AI Costs (Highest Expense)

#### Development Phase (First 2-3 months)
- **Use API Free Credits:**
  - OpenAI: $18 free credit for new accounts
  - Anthropic Claude: $5 free credit
  - Total: ~500-1000 test conversations free

- **Model Strategy:**
  - **GPT-4o** for all conversations (fast and cost-effective: $2.50/1M input tokens, $10/1M output tokens)
  - **GPT-4o-mini** for simple responses (even cheaper: $0.15/1M input, $0.60/1M output)
  - **Use GPT-4** only for complex emotional support if needed
  - Average cost per conversation: $0.002-0.005

- **Caching Strategy:**
  - **Cache system prompts** (personality, context) - saves 50% on input tokens
  - **Cache common responses** in Redis (greetings, motivational quotes)
  - **Implement prompt caching** using OpenAI's new cache feature

- **Rate Limiting by Tier:**
  ```python
  # Free Tier Limits
  MAX_MESSAGES_FREE = 50 / day
  MAX_VOICE_MINUTES_FREE = 10 / day
  
  # Premium Tier ($9.99/mo)
  MAX_MESSAGES_PREMIUM = 500 / day
  MAX_VOICE_MINUTES_PREMIUM = 60 / day
  
  # Pro Tier ($19.99/mo)
  MAX_MESSAGES_PRO = unlimited
  MAX_VOICE_MINUTES_PRO = unlimited
  ```

#### Production Phase (10K Active Users)
**Expected Breakdown:**
- 70% Free users: 7K × 25 msgs/month × $0.003 = $525/month
- 20% Premium: 2K × 250 msgs/month × $0.003 = $1,500/month
- 10% Pro: 1K × 500 msgs/month × $0.003 = $1,500/month
- **Total AI Cost:** ~$3,500/month

**Optimization Tactics:**
- Use **context window compression** (LangChain summarization)
- Implement **user-based caching** for repeated questions
- **Batch processing** for non-real-time operations
- Monitor usage with **OpenAI dashboard alerts**

---

### Voice Costs

#### Development Phase
- **Use Free Tiers:**
  - Google Cloud TTS: 1M characters free/month
  - ElevenLabs: 10K characters free/month
  - **Cost:** $0/month for development

- **Strategy:**
  - Free tier: Google Cloud TTS (acceptable quality)
  - Premium tier: ElevenLabs (ultra realistic)

#### Production Phase
- **Free Users:** Google Cloud TTS
  - 7K users × 1K chars/month = 7M chars
  - Google pricing: $4 per 1M chars
  - **Cost:** ~$28/month

- **Premium/Pro Users:** ElevenLabs
  - 3K users × 5K chars/month = 15M chars
  - ElevenLabs: $0.30 per 1K chars = $4,500/month
  - Alternative: Use voice cloning once, then cache common phrases
  - **Optimized Cost:** ~$1,500/month with caching

**Voice Optimization:**
```python
# Cache common voice responses
CACHED_PHRASES = [
    "Hello! How are you today?",
    "I'm here to listen.",
    "Tell me more about that.",
    # Store pre-generated audio files
]

# Only generate TTS for unique responses
if response not in CACHED_PHRASES:
    audio = await generate_tts(response)
else:
    audio = load_cached_audio(response)
```

---

### Avatar Rendering Costs

#### Development Phase
- **Free Tools Only:**
  - Ready Player Me: Free
  - CyanPuppets: Free (browser-based)
  - Metavance: Free (UE5)
  - Three.js: Free (open source)
  - ViroReact: Free (open source)
  - **Cost:** $0/month

#### Production Phase
- **Free Users:** Static 2D images with animations
  - Cost: $0 (pre-rendered, hosted on CDN)

- **Premium Users:** 3D avatars + AR
  - Rendering: Client-side (user's device)
  - Storage: Supabase free tier (1GB) or S3 ($0.023/GB)
  - **Cost:** ~$50/month for storage

**Avatar Strategy:**
- **NO** D-ID or Synthesia for MVP (too expensive)
- Use **client-side rendering** with Three.js (free)
- Store FBX models in CDN (one-time upload)

---

### Infrastructure Costs

#### Development Phase (~3 months)

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Supabase** | 500MB database, 1GB storage, 2GB bandwidth | $0 |
| **Vercel/Railway** | FastAPI hosting | $0 |
| **Pinecone** | 1 index, 100K vectors | $0 |
| **OpenAI API** | $18 free credit | $0 |
| **ElevenLabs** | 10K chars/month | $0 |
| **CloudFlare CDN** | Unlimited bandwidth | $0 |
| **Total Development** | | **$0-20/month** |

**Strategy:**
- Use **all free tiers** during development
- Only pay for API usage beyond free credits (~$10-20/month)
- Supabase free tier handles up to 50K requests/day
- Vercel/Railway free tier supports <1K users

#### Production Phase (10K Users)

| Service | Cost |
|---------|------|
| **Supabase Pro** | $25/month |
| **Railway/Render** (FastAPI hosting) | $15-50/month |
| **Pinecone** | $70/month (100K vectors) |
| **OpenAI API** | $3,500/month |
| **ElevenLabs** | $1,500/month |
| **CDN/Storage** | $100/month |
| **Total** | **$5,200-5,250/month** |

---

### Query Optimization for Scaling

**Critical for staying within budget:**

1. **Database Indexing:**
   ```sql
   -- Index frequently queried columns
   CREATE INDEX idx_messages_conversation ON messages(conversation_id);
   CREATE INDEX idx_messages_created ON messages(created_at);
   CREATE INDEX idx_user_active ON users(last_active);
   ```

2. **Implement Caching Layers:**
   ```python
   # Cache user context (1 hour)
   @cache(ttl=3600)
   async def get_user_context(user_id):
       return await db.query(...)
   
   # Cache conversation history (5 minutes)
   @cache(ttl=300)
   async def get_recent_messages(conversation_id):
       return await db.query(...)
   ```

3. **Lazy Loading:**
   - Only fetch last 10 messages initially
   - Load older messages on scroll
   - Don't load full avatar until visible

4. **Rate Limit Monitoring:**
   ```python
   # Alert when user approaches limits
   if user.daily_messages >= MAX_MESSAGES * 0.8:
       send_upgrade_prompt()
   ```

---

### Revenue Projections vs Costs

**Scenario: 10K Active Users**

| Metric | Value |
|--------|-------|
| Free users (70%) | 7,000 |
| Premium users (20% conversion) | 2,000 × $9.99 = $19,980/mo |
| Pro users (10% of premium) | 1,000 × $19.99 = $19,990/mo |
| **Total Revenue** | **$39,970/month** |
| **Total Costs** | **$5,250/month** |
| **Net Profit** | **$34,720/month** |
| **Profit Margin** | **87%** |

**Bootstrap Path:**
1. **Month 1-3:** Development ($0-60 total)
2. **Month 4:** Launch MVP, 100 users ($50 cost, $100 revenue)
3. **Month 5:** 500 users ($200 cost, $500 revenue)
4. **Month 6:** 1,000 users ($400 cost, $1,200 revenue)
5. **Month 9:** 5,000 users ($2,500 cost, $10,000 revenue)
6. **Month 12:** 10,000 users ($5,250 cost, $40,000 revenue)

**Budget Safety:**
- Total development cost: ~₹5,000 ($60)
- Stays well under ₹50,000 budget
- Profitable from Month 4 onwards

---

## 9. Development Roadmap

### Phase 1: MVP (4-6 weeks)
- [ ] Basic chat interface
- [ ] OpenAI integration
- [ ] Simple avatar (static image)
- [ ] Basic text-only conversations
- [ ] User authentication
- [ ] PostgreSQL setup

### Phase 2: Voice & Animation (4-6 weeks)
- [ ] Voice input (Whisper STT)
- [ ] Voice output (ElevenLabs TTS)
- [ ] Animated avatar (Live2D or WebView 3D)
- [ ] Real-time conversation
- [ ] Voice call mode

### Phase 3: Personality & Memory (3-4 weeks)
- [ ] Personality customization UI
- [ ] Vector database integration
- [ ] Long-term memory system
- [ ] Context-aware responses
- [ ] Memory gallery

### Phase 4: Polish & Scale (3-4 weeks)
- [ ] Push notifications
- [ ] Daily check-ins
- [ ] Mood tracking
- [ ] Performance optimization
- [ ] Analytics

---

## 10. Estimated Infrastructure Costs

### For 10,000 Active Users:

| Service | Monthly Cost |
|---------|-------------|
| OpenAI API (GPT-4o) | $2,000 - $4,000 |
| ElevenLabs TTS | $1,500 - $3,000 |
| Pinecone Vector DB | $70 - $200 |
| AWS/DigitalOcean Hosting | $200 - $500 |
| PostgreSQL (RDS) | $100 - $300 |
| Redis Cache | $50 - $150 |
| CDN + Storage (S3) | $100 - $300 |
| **Total** | **$4,020 - $8,450** |

**Revenue Model:**
- Free tier: Limited messages, basic avatar
- Premium: $9.99/mo - Unlimited, realistic avatar
- Pro: $19.99/mo - Multiple companions, priority

---

## 11. Recommended Tech Stack Summary

### ✅ Final Recommendation

**Frontend:**
- React Native + TypeScript
- Zustand (state management)
- React Navigation
- React Native Reanimated

**Backend:**
- **Node.js (Fastify)** - API server
- **Python FastAPI** - AI services
- **PostgreSQL** - Main database
- **Redis** - Caching & sessions
- **Pinecone** - Vector database

**AI & Voice:**
- **OpenAI GPT-4o** - Conversational AI
- **LangChain** - Conversation management
- **OpenAI Whisper** - Speech-to-text
- **ElevenLabs** - Text-to-speech

**Avatar:**
- **Ready Player Me** + Three.js (3D realistic)
- Or **D-ID API** (premium video avatars)

**Infrastructure:**
- **AWS/DigitalOcean** - Hosting
- **S3** - Media storage
- **CloudFront** - CDN

---

## 12. Sample Implementation Snippets

### React Native Conversation Hook

```typescript
// hooks/useConversation.ts
import { useState } from 'react';
import { useStore } from '../store';
import { sendMessage, streamResponse } from '../services/api/chatService';

export const useConversation = () => {
  const [loading, setLoading] = useState(false);
  const { addMessage, currentConversationId } = useStore();

  const sendUserMessage = async (content: string) => {
    setLoading(true);
    
    // Add user message
    addMessage({
      id: uuid(),
      sender: 'user',
      content,
      timestamp: new Date(),
    });

    try {
      // Stream AI response
      await streamResponse(
        currentConversationId,
        content,
        (chunk) => {
          // Update AI message in real-time
          updateStreamingMessage(chunk);
        }
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { sendUserMessage, loading };
};
```

### Backend Chat Endpoint

```python
# services/ai/chat_service.py
from fastapi import FastAPI, WebSocket
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

app = FastAPI()

@app.websocket("/ws/chat/{conversation_id}")
async def chat_websocket(websocket: WebSocket, conversation_id: str):
    await websocket.accept()
    
    # Load conversation context
    context = await load_context(conversation_id)
    
    # Initialize LLM
    llm = ChatOpenAI(
        model="gpt-4o",
        streaming=True,
        temperature=0.9
    )
    
    while True:
        # Receive user message
        user_message = await websocket.receive_text()
        
        # Build prompt with personality
        prompt = build_prompt(user_message, context)
        
        # Stream response
        response = ""
        async for chunk in llm.astream(prompt):
            response += chunk.content
            await websocket.send_text(chunk.content)
        
        # Save to database
        await save_message(conversation_id, user_message, response)
```

---

## Next Steps

1. **Start with MVP**: Build basic chat with GPT-4o
2. **Add voice**: Integrate Whisper + ElevenLabs
3. **Implement avatar**: Start with static images, upgrade to 3D
4. **Scale gradually**: Add features based on user feedback
