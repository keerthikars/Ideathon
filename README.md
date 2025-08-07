# Postpartum Recovery Companion

A comprehensive Progressive Web App designed to support new mothers during their postpartum recovery journey. Built with React, TypeScript, and modern web technologies with offline-first functionality.

## Features

- **Daily Tracking**: Mood, pain levels, sleep quality, and recovery metrics
- **Voice & Text Journaling**: Express thoughts and feelings safely
- **Self-Care Reminders**: Customizable alerts for wellness activities
- **Educational Content**: Learn about postpartum recovery topics
- **Baby Care Logs**: Track feeding, diaper changes, and milestones
- **Progress Dashboard**: Visual trends and achievement tracking
- **Emergency Resources**: Quick access to contacts and safety guides
- **Offline Support**: Works without internet connection
- **PWA Ready**: Install on any device like a native app

## Design Principles

- **Mobile-First**: Optimized for touch devices
- **Soft Pastel Colors**: Easy on tired eyes
- **Large Touch Targets**: Accessible interface
- **Offline-First**: All data stored locally
- **Privacy-Focused**: No data leaves your device

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: Wouter
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Custom hooks + LocalStorage
- **Build Tool**: Vite
- **Database**: Drizzle ORM + PostgreSQL (optional)
- **PWA**: Service Worker + Web App Manifest

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5000`

## Installation as PWA

### Mobile (iPhone/Android):
- Open in Safari/Chrome → Share → "Add to Home Screen"

### Desktop (Chrome/Edge):
- Look for install icon in address bar → Click "Install"

## Project Structure

```
├── client/                 # Frontend React app
│   ├── public/            # Static assets & PWA files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
├── server/                # Backend Express server
├── shared/                # Shared types and schemas
└── package.json           # Dependencies and scripts
```

## Key Features

### Tracking & Logging
- Mood tracking with visual indicators
- Pain level monitoring with sliders
- Sleep quality assessment
- Daily symptom checklist
- Baby care activities

### Wellness & Support
- Guided breathing exercises
- Gentle movement routines
- Educational articles
- Emergency contact quick access
- Mental health resources

### Data & Privacy
- All data stored locally on device
- No external data transmission
- Secure local storage encryption
- Data export/backup options
- Complete data deletion available

## Customization

The app uses CSS custom properties for theming. Edit `client/src/index.css` to customize colors:

```css
:root {
  --soft-pink: hsl(330, 60%, 85%);
  --soft-blue: hsl(200, 60%, 85%);
  --calm-green: hsl(120, 40%, 80%);
  --warm-yellow: hsl(45, 80%, 85%);
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations

## Browser Support

- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Contributing

This is a personal recovery companion app. Feel free to fork and customize for your own needs.

## License

MIT License - Feel free to use and modify as needed.

## Support

This app is designed to complement, not replace, professional medical care. Always consult with healthcare providers for medical concerns.