# Sera AI - AI Companion App

Your personal AI friend, always there for you.

## Features

- 💬 Smart Conversations
- 🎭 Personalized Avatar
- 🔒 Private & Secure

## Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Express.js + SQLite
- **Navigation:** React Navigation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/SHEIK-32/Sera---AI.git
cd Sera---AI

# Install mobile app dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Start the server (in one terminal)
cd server
npm start

# Start the mobile app (in another terminal)
npx expo start
```

### Running the App

1. Start the backend server:
   ```bash
   cd server
   npm start
   ```

2. Start Expo:
   ```bash
   npx expo start
   ```

3. Scan QR code with Expo Go on your Android device

## Project Structure

```
Sera---AI/
├── src/
│   ├── screens/       # App screens
│   ├── navigation/    # Navigation config
│   ├── api/           # API client
│   ├── store/         # State management
│   └── theme/         # App theme
├── server/            # Backend API
│   └── server.js      # Express server
├── App.tsx            # App entry point
└── package.json       # Dependencies
```

## API Endpoints

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/chat` - Chat with AI

## License

MIT
