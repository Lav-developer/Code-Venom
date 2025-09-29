# Code Venom - AI Coding Instructions

## Project Overview
Code Venom is a college coding club website with dual architecture: a legacy static site and a modern PWA version. The project represents IET-DSMNRU's coding collective with interactive features like matrix rain effects, typing animations, and glassmorphism design.

## Architecture & Structure

### Dual Architecture Pattern
- **Root level**: Legacy static website (`index.html`, `script.js`, `styles.css`)
- **`Code Venom/` subfolder**: Modern PWA with Vite build system and modular ES6+ architecture
- Both versions share the same branding but use different tech stacks

### Modern PWA Structure (`Code Venom/` folder)
```
src/
├── index.html          # Modern version entry point
├── js/
│   ├── app.js         # Main app entry, imports all modules
│   ├── ui.js          # UI interactions, GSAP animations, ScrollReveal
│   ├── chatbot.js     # Chatbot functionality
│   └── sw-register.js # Service worker registration
├── styles/
│   ├── base.scss      # SCSS with variables ($green, $dark, $font)
│   └── components/    # Component-specific styles
└── assets/img/        # Project images and assets
```

## Key Patterns & Conventions

### Design System
- **Primary color**: `#00ff5b` (neon green) - stored as SCSS variable `$green`
- **Dark theme**: `#0b0d14` background with `#e0e0e0` text
- **Glassmorphism effects**: Use `.glass` class with `backdrop-filter: blur(8px)`
- **Neon effects**: Apply `.neon` class for green text-shadow glow

### JavaScript Architecture
- **Module pattern**: ES6 imports/exports in modern version
- **Class-based**: Legacy version uses `CodeVenomWebsite` class with method chaining
- **Animation libraries**: GSAP for complex animations, ScrollReveal for scroll triggers
- **Matrix rain effect**: Canvas-based background animation (see `setupMatrixRain()`)

### Component Data Structure
Projects are defined as objects with consistent schema:
```javascript
{
  title: 'Project Name',
  desc: 'Brief description',
  img: '/assets/img/filename.png',
  link: 'https://github.com/...'
}
```

### Development Workflow
- **No package.json**: Dependencies loaded via CDN (legacy) or ES6 imports (modern)
- **PWA features**: Service worker with Workbox, manifest file, offline caching
- **Build tool**: Vite configuration (currently empty but ready for setup)
- **SCSS compilation**: Modern version uses SCSS with CSS custom properties

## Critical Integration Points

### Animation Coordination
- Matrix rain canvas must be positioned absolutely behind content
- GSAP timeline coordination with ScrollReveal intervals (100ms stagger)
- Cursor effects use RAF loop with easing: `followerX += (mouseX - followerX) * 0.1`

### PWA Service Worker
- Workbox config caches images for 30 days, 60 max entries
- Runtime caching strategy: `CacheFirst` for images
- Register SW in `app.js` after DOM content loaded

### Mobile Navigation
- Burger menu uses `toggleAttribute('open')` on nav element
- ARIA compliance: `aria-expanded` updates with menu state
- CSS transforms: `translateX(100%)` for off-canvas menu

## Common Issues & Solutions

### Navbar Duplication Bug
Legacy version has known navbar duplication issue. Fixed with:
```javascript
fixNavbarDuplication() {
  const navbars = document.querySelectorAll('.navbar');
  if (navbars.length > 1) {
    for (let i = 1; i < navbars.length; i++) {
      navbars[i].remove();
    }
  }
}
```

### Performance Optimization
- Use `transform: translateZ(0)` and `will-change: transform` for GPU acceleration
- Preload critical CSS files with `rel="preload"`
- Matrix animation should use `requestAnimationFrame` for 60fps

## File Naming & Organization
- Kebab-case for CSS classes: `.hero-inner`, `.nav-list`
- camelCase for JavaScript: `initUI()`, `setupMatrixRain()`
- Assets in `/assets/img/` with descriptive names
- SCSS partials in `styles/components/` for modularity