# Bagginsite - Discord Bots Showcase

## Overview
Bagginsite is a React-based web application that showcases Discord bots. It features a modern, Discord-themed UI with bot profiles, search functionality, and real-time updates from GitHub repositories.

## Project Architecture

### Technology Stack
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (CDN)
- **API Integration**: GitHub API (for fetching bot updates)

### Project Structure
```
├── assets/                 # Bot avatars and logos
├── components/            # React components
│   ├── BotCard.tsx       # Individual bot card component
│   ├── BotProfileCard.tsx # Bot profile modal
│   ├── Header.tsx        # Site header
│   ├── Popup.tsx         # Popup component
│   ├── SearchBar.tsx     # Search functionality
│   └── Updates.tsx       # GitHub updates component
├── App.tsx               # Main application component
├── constants.ts          # Bot data configuration
├── types.ts             # TypeScript type definitions
├── index.tsx            # Application entry point
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts

```

### Key Features
1. **Bot Showcase**: Displays Discord bots with avatars, descriptions, and tags
2. **Search Functionality**: Filter bots by name, description, or tags
3. **GitHub Integration**: Shows recent commits from bot repositories
4. **Responsive Design**: Mobile-friendly Discord-themed UI
5. **Invite Links**: Direct links to add bots to Discord servers

## Configuration

### Development Server
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows proxy access)
- **Base Path**: / (local development)

### Environment Variables
- `GEMINI_API_KEY`: Optional (configured but not currently used in the code)

### Workflows
- **dev**: Runs the Vite development server on port 5000

## Recent Changes
- **2025-11-02**: Initial setup for Replit environment
  - Updated vite.config.ts to use port 5000
  - Fixed ES module `__dirname` compatibility
  - Added asset type declarations (vite-env.d.ts)
  - Configured base path for local development
  - Set up workflow for webview on port 5000

## Bot Data
Currently showcases two bots:
1. **Meat Bro**: AI-powered character bot
2. **Blevitron**: Humanoid AI bot with commands

Bot data is stored in `constants.ts` and can be easily extended.

## Development Notes
- The app uses Tailwind CSS via CDN (not recommended for production)
- GitHub API is used without authentication (rate limits may apply)
- All bot images are stored locally in the assets folder
