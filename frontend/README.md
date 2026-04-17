# CSR Agent Frontend

Interactive and responsive frontend for the CSR Agent using LiveKit's Agents UI components.

## Features

- **Real-time Voice Interface**: Connect to CSR agent with natural voice conversations
- **Audio Visualizer**: Live frequency bars showing agent audio activity
- **Chat Transcript**: Real-time conversation history with speaker identification
- **Media Controls**: Full control over microphone, camera, and session management
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS

## Technology Stack

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development with full IntelliSense support
- **LiveKit Agents UI**: Pre-built components for voice agent interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast development server and optimized builds

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AudioVisualizer.tsx
│   │   ├── ChatTranscript.tsx
│   │   ├── AudioVisualizer.css
│   │   └── ChatTranscript.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Installation

1. **Install dependencies**:
```bash
cd frontend
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

## Usage

1. Open the frontend in your browser
2. Click "Connect to Agent" to establish connection with the CSR backend
3. Use the media controls to manage audio/video settings
4. View real-time conversation transcript
5. Monitor audio levels through the visualizer

## Components

### AudioVisualizer
- Displays real-time frequency bars
- Animated gradients and smooth transitions
- Responsive canvas sizing

### ChatTranscript
- Shows conversation history
- Distinguishes between user and agent messages
- Timestamped entries with smooth animations

### Main App
- Integrates all components
- Manages connection state
- Handles agent lifecycle events

## Configuration

The frontend connects to the CSR agent backend using LiveKit's real-time communication protocols. Ensure the backend is running and accessible before starting the frontend.

## Development

The frontend is configured for hot module replacement and fast refresh during development. TypeScript provides type safety and better developer experience.
