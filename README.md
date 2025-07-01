# Xflix - Modern Video Streaming Platform

A modern, responsive video sharing platform built with React.js that allows users to browse, search, filter, and upload videos from external sources like YouTube.

## 🚀 Features

### Core Features
- **Video Browsing**: Grid-based video display with responsive design
- **Advanced Search**: Real-time search with debounced input
- **Smart Filtering**: Filter by genre, age rating, and sort options
- **Video Upload**: Upload videos using external links (YouTube, Vimeo)
- **Video Playback**: Embedded video player with view tracking
- **Interactive Voting**: Like/dislike functionality for videos
- **Responsive Design**: Mobile-first approach with Material-UI

### Technical Features
- **Modern React 18**: Hooks, Suspense, Error Boundaries
- **Performance Optimized**: Memoization, lazy loading, code splitting
- **Custom Hooks**: Reusable logic for videos and debouncing
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Development Tools**: ESLint, Prettier for code quality

## 🛠️ Technology Stack

- **Frontend**: React 18.2, Material-UI 5.14
- **Routing**: React Router DOM 6.20
- **State Management**: Custom hooks with Context API
- **HTTP Client**: Axios with interceptors
- **Notifications**: Notistack for user feedback
- **Development**: ESLint, Prettier
- **Testing**: Jest, React Testing Library

## 📦 Installation

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Xflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Browsing Videos
- Visit the homepage to see all available videos
- Use the search bar to find specific videos by title
- Apply filters for genre, age rating, and sorting preferences
- Click on any video card to view details and play the video

### Uploading Videos
1. Click the "Upload" button in the header
2. Fill in the required details (Video Link, Title, Genre, etc.)
3. Click "Upload" to submit

## 🏗️ Architecture

Built with modern React patterns:
- **Custom Hooks**: Centralized state management
- **Memoization**: Performance optimization with React.memo
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-first approach

## 📊 Performance Optimizations

- **React.memo**: Component memoization
- **useCallback/useMemo**: Optimized re-renders
- **Debounced Search**: Reduced API calls
- **Lazy Loading**: On-demand resource loading

## 🧪 Development

```bash
# Run development server
npm start

# Run tests
npm test

# Run linting
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

## 🚀 Deployment

The application can be deployed to:
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build files
- **Any static hosting service**

## Skills Demonstrated
React.js, Material-UI, Custom Hooks, Performance Optimization, Responsive Design, API Integration, Modern JavaScript, Testing, Build Tools.
