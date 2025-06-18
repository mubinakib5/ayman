# Ayman Siddique - Personal Website

A modern, responsive personal website showcasing the professional portfolio and literary works of Ayman Siddique - CEO of The Decor and acclaimed author. Built with React, featuring smooth scroll animations, glassmorphism design, and parallax effects.

![Ayman Siddique Website Preview](https://via.placeholder.com/800x400/1e40af/ffffff?text=Ayman+Siddique+Website)

## 🌟 Features

### Design & UX

- **Modern Glassmorphism Design**: Semi-transparent cards with backdrop blur effects
- **Smooth Scroll Animations**: Framer Motion-powered section transitions and stacking effects
- **Parallax Scrolling**: React Scroll Parallax for dynamic background effects
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Accessibility**: High contrast text, semantic HTML, and keyboard navigation support

### Content Sections

- **Hero Section**: Dynamic landing with signature-style typography and featured content
- **About**: Professional background as CEO and writer with dual career highlights
- **Portfolio**: Business milestones and achievements with interactive cards
- **Nonprofit**: Third Smile Foundation initiatives and impact stories
- **Books**: Literary works with awards, descriptions, and Amazon links
- **Awards**: Recognition and achievements across business and literature
- **Contact**: Professional contact form with social media integration

### Technical Features

- **Performance Optimized**: Vite build system for fast development and production builds
- **SEO Ready**: Semantic HTML structure and meta tags
- **Modern JavaScript**: ES6+ features and React 19
- **CSS-in-JS**: Tailwind CSS for utility-first styling
- **Animation Library**: Framer Motion for smooth, performant animations

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern React with latest features
- **Vite 6.3.5** - Fast build tool and development server
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **Framer Motion 12.18.1** - Animation library for React
- **React Router DOM 7.6.1** - Client-side routing
- **React Scroll Parallax 3.4.5** - Parallax scrolling effects
- **React Intersection Observer 9.16.0** - Scroll-based animations

### Development Tools

- **ESLint 9.25.0** - Code linting and formatting
- **PostCSS 8.4.27** - CSS processing
- **Autoprefixer 10.4.14** - CSS vendor prefixing
- **TypeScript Support** - Type definitions for React

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ayman-site.git
   cd ayman-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the website

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run preview      # Preview production build locally

# Build
npm run build        # Build for production
npm run lint         # Run ESLint for code quality
```

## 📁 Project Structure

```
ayman-site/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Images and media files
│   │   ├── Ayman.jpeg
│   │   ├── CEO.jpeg
│   │   └── react.svg
│   ├── components/        # React components
│   │   ├── About.jsx
│   │   ├── Awards.jsx
│   │   ├── Books.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Nonprofit.jsx
│   │   └── Portfolio.jsx
│   ├── utils/            # Utility functions and data
│   │   └── data.js       # Content data for all sections
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles
│   ├── index.css         # Tailwind CSS imports
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── README.md            # Project documentation
```

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#1e40af` (blue-700)
- **Secondary Blue**: `#3b82f6` (blue-500)
- **Dark Background**: `#0f172a` (slate-900)
- **Glassmorphism**: `rgba(255, 255, 255, 0.1)` with backdrop blur

### Typography

- **Signature Font**: Custom signature-style typography for name display
- **Headings**: Bold, high-contrast text for accessibility
- **Body Text**: Readable font sizes with proper line spacing

### Animation System

- **Scroll Triggers**: Intersection Observer for scroll-based animations
- **Smooth Transitions**: 0.6-0.8s duration with ease-out timing
- **Parallax Effects**: Background image parallax with scale transformations

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration for:

- Custom color palette
- Typography scale
- Animation utilities
- Responsive breakpoints

### Vite Configuration

Optimized for:

- Fast hot module replacement
- Production builds
- Asset optimization
- React JSX support

## 📱 Responsive Design

The website is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

- Touch-friendly navigation
- Optimized image loading
- Simplified layouts for small screens
- Proper spacing and typography scaling

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

#### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

#### Vercel

1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

#### GitHub Pages

1. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/ayman-site",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

## 🔄 Content Management

### Updating Content

All content is managed through `src/utils/data.js`:

- **Portfolio Items**: Update `portfolioData.items`
- **Books**: Modify `booksData` array
- **Awards**: Edit `awardsData` array
- **Nonprofit**: Update `nonprofitData.initiatives`

### Adding New Sections

1. Create new component in `src/components/`
2. Add data to `src/utils/data.js`
3. Import and add to `src/App.jsx`
4. Update navigation in `src/components/Navbar.jsx`

## 🧪 Testing

### Manual Testing Checklist

- [ ] Responsive design across all devices
- [ ] Smooth scroll animations
- [ ] Contact form functionality
- [ ] Navigation links
- [ ] Image loading and optimization
- [ ] Accessibility features

### Performance Testing

- Lighthouse audit for performance, accessibility, and SEO
- Core Web Vitals optimization
- Image compression and lazy loading

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test thoroughly
5. Commit with descriptive messages: `git commit -m "Add new feature"`
6. Push to your branch: `git push origin feature/new-feature`
7. Create a pull request

### Code Standards

- Follow ESLint configuration
- Use meaningful component and variable names
- Add comments for complex logic
- Maintain consistent formatting
- Test on multiple devices and browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ayman Siddique**

- CEO, The Decor
- Acclaimed Author
- Founder, Third Smile Foundation

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Unsplash for high-quality images

## 📞 Support

For questions or support:

- Email: ayman@gmail.com
- Phone: +880 1858-547236
- LinkedIn: [Ayman Siddique](https://linkedin.com/in/ayman-siddique)

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
