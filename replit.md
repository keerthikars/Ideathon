# Mumma.ai - Postpartum Recovery Companion

## Overview

This is a progressive web application designed to support new mothers during their postpartum recovery journey. The app provides comprehensive tracking tools for mood, pain, sleep quality, and baby care, along with journaling, educational content, and wellness features. Built with React and TypeScript, the application emphasizes offline functionality and mobile-first design with a soothing pastel color palette optimized for tired eyes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing, enabling seamless navigation between app sections
- **UI Components**: Radix UI primitives with shadcn/ui styling for accessible, consistent interface components
- **Styling**: Tailwind CSS with custom pastel color variables designed for postpartum recovery (soft-pink, soft-blue, calm-green, warm-yellow)
- **Mobile-First Design**: Responsive layout optimized for mobile devices with touch-friendly interactions and bottom navigation

### State Management & Data Storage
- **Client-Side Storage**: Custom LocalStorage wrapper for persisting all user data offline
- **Data Models**: Zod schemas for type-safe data validation covering mood tracking, pain levels, sleep quality, journal entries, reminders, and baby care logs
- **State Hooks**: Custom React hooks (useRecoveryData, useLocalStorage) for managing application state and data persistence

### Progressive Web App Features
- **Service Worker**: Custom service worker implementation for offline functionality and caching strategies
- **Web App Manifest**: Configured for standalone mobile app experience with custom icons and shortcuts
- **Offline-First**: All features work without internet connectivity, data stored locally

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for API endpoints (currently minimal implementation)
- **Database Configuration**: Drizzle ORM configured for PostgreSQL with migration support
- **Development Setup**: Vite for hot module replacement and fast development builds

### Component Structure
- **Layout Components**: Mobile container with responsive design, app header with recovery progress, bottom navigation
- **Feature Components**: Specialized UI components for mood selection, pain tracking sliders, progress rings
- **Page Components**: Modular page structure for tracker, journal, wellness, reminders, and educational content

### Development Tools & Build Process
- **Build Tool**: Vite for fast development and optimized production builds
- **TypeScript**: Strict type checking across client, server, and shared code
- **Package Management**: ESModule support with modern JavaScript features
- **Development Workflow**: Hot reload for rapid iteration, TypeScript compilation, and build optimization

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives for dialogs, forms, navigation, and interactive components
- **Lucide React**: Icon library providing consistent visual elements throughout the application
- **Class Variance Authority**: Utility for creating variant-based component APIs with Tailwind CSS

### Data & State Management
- **TanStack React Query**: Server state management and caching (configured for offline-first usage)
- **Zod**: Runtime type validation and schema definition for data models
- **Date-fns**: Date manipulation and formatting utilities for tracking and scheduling features

### Database & Storage
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL provider for production database needs

### Development & Build Tools
- **Vite**: Fast build tool with React plugin and development server
- **PostCSS & Autoprefixer**: CSS processing pipeline for cross-browser compatibility
- **ESBuild**: Fast JavaScript bundler for production builds

### Mobile & PWA Features
- **Workbox**: Service worker utilities for caching strategies and offline functionality
- **Web API Support**: Native browser APIs for notifications, storage, and mobile-specific features