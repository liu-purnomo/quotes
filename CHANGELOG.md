# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Dynamic Quote System Implementation**
  - Auto-generate ID system for quotes without manual ID conflicts
  - Modular file structure with separate author files for better organization
  - Support for quote sources attribution in author field format

### Changed
- **Quote Data Structure Improvements**
  - Refactored quotes into individual author files for better maintainability
  - Implemented automatic ID generation to prevent conflicts
  - Enhanced author attribution format to include book sources

### Enhanced
- **Steve Jobs Quotes Collection**
  - Added 110+ authentic Steve Jobs quotes with Indonesian translations
  - Organized quotes by themes: innovation, leadership, design, motivation, etc.
  - Natural Indonesian translations maintaining original meaning and context
- **Tere Liye Quotes Collection**
  - Added 100+ authentic Tere Liye quotes from popular Indonesian novels
  - Categorized by themes: kehidupan, cinta, motivasi, harapan, perjuangan, etc.
  - Proper attribution with book titles from Bumi series, Pulang, Hujan, etc.

## [1.0.0] - 2024-12-14

### Added
- **Core API Endpoints**
  - `GET /api/quotes` - List all quotes with pagination, filtering, and sorting
  - `GET /api/quotes/random` - Get random quote with optional category filter
  - `GET /api/quotes/:id` - Get specific quote by ID
- **Web Application Features**
  - Interactive quotes viewer with modern UI
  - Slideshow mode with auto-play functionality
  - Fullscreen mode for immersive experience
  - Theme switcher with 5 gradient themes
  - Smooth animations powered by Framer Motion
- **Responsive Design**
  - Mobile-first approach with bottom dock controls
  - Desktop optimized with top-right controls
  - Touch-friendly interface for mobile devices
- **Rate Limiting System**
  - 30 requests/minute for standard endpoints
  - 60 requests/minute for random endpoint (slideshow friendly)
  - IP-based rate limiting with proper headers
- **Comprehensive Documentation**
  - Interactive API documentation at `/docs`
  - Detailed endpoint documentation with examples
  - Response format specifications
  - Usage examples and best practices
- **Data Collection**
  - 100+ inspirational quotes in Indonesian
  - 15 categories including motivasi, kesuksesan, kehidupan, etc.
  - Quotes from world figures, Indonesian leaders, and anime characters
  - Proper attribution for all quotes
- **Developer Experience**
  - TypeScript for type safety
  - ESLint and Prettier configuration
  - Conventional commits setup
  - Production-ready build optimization

### Technical Details
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel ready

### API Features
- **Pagination**: Configurable page size (max 100 items)
- **Filtering**: By category, author, and global search
- **Sorting**: By id, text, author, or category (asc/desc)
- **Error Handling**: Consistent error responses with proper HTTP status codes
- **Headers**: Rate limit information in response headers

### Security & Performance
- In-memory rate limiting implementation
- Input validation and sanitization
- Optimized build with static generation
- Proper error boundaries and handling

---

## Version History Legend

- 🎉 **Added** - New features
- ⚡ **Changed** - Changes in existing functionality  
- 🐛 **Fixed** - Bug fixes
- ⚠️ **Deprecated** - Soon-to-be removed features
- 🗑️ **Removed** - Removed features
- 🔒 **Security** - Vulnerability fixes

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/) format and [Semantic Versioning](https://semver.org/) principles.

[Unreleased]: https://github.com/liu-purnomo/quotes/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/liu-purnomo/quotes/releases/tag/v1.0.0