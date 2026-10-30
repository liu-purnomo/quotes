# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Upgraded Next.js to 16.4.3 and React to 19.3.1
- Replaced `next lint` with the ESLint CLI and moved to native flat config
- Raised the minimum Node.js version to 20.9

### Added
- Quote image editor on the quote detail page: feed, portrait and story sizes, photo upload stored only in browser IndexedDB, Unsplash and Pixabay search, draggable text, brightness and color overlays, and text effects
- 259 source-checked quotes from 145 public figures, with a source link on the quote detail page

## [0.2.0] - 2025-01-15

### Added
- **Quote Navigation System**
  - Previous/Next quote navigation in detail pages
  - API endpoint for quote navigation with adjacent quote info
  - Mobile-responsive navigation with author preview
- **Enhanced Quotes Collection**
  - Added philosophers: Al-Farabi, Al-Ghazali, Al-Kindi, Aristoteles, Ibnu Khaldun, Ibnu Sina, Immanuel Kant, Socrates, Plato, Phytagoras, Thales
  - Added historical figures: Sun Tzu, Tan Malaka, Jalaludin Rumi
  - Added modern figures: Jack Ma, Ustadz Adi Hidayat
  - Total 16 new author collections with 100+ additional quotes

### Changed
- **UI/UX Improvements**
  - Converted card grid layout to compact list view for better mobile experience
  - Improved dropdown z-index handling for better accessibility
  - Removed complex animations from quotes list for better performance
  - Enhanced mobile pagination with separate mobile/desktop layouts

### Fixed
- **Dropdown Menu Issues**
  - Fixed z-index conflicts preventing dropdown menus from displaying
  - Simplified stacking context hierarchy
  - Removed backdrop-blur from container elements causing interference
- **Mobile Responsiveness**
  - Fixed pagination layout issues on mobile devices
  - Improved touch targets and spacing
  - Better responsive typography and button sizing

### Technical
- **Performance Optimizations**
  - Removed Framer Motion from quotes list to reduce complexity
  - Simplified CSS architecture with cleaner z-index management
  - Better Tailwind CSS practices for z-index handling

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