# Parker Peterman Portfolio - React Version

This is your personal portfolio website converted to React. There are two versions provided:

1. **Single-file version** (App.jsx) - All code in one file for simplicity
2. **Modular version** (components folder) - Split into reusable components for better organization

## Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## File Structure

### Single-File Version (Current)
```
/
├── index.html          # HTML entry point
├── main.jsx            # React entry point
├── App.jsx             # Main component (entire site)
├── App.css             # All styles
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── public/             # Static assets (images, videos)
    ├── 20251004_121924.jpg
    ├── PortfolioVideo.mp4
    ├── Amazon_Web_Services_Logo.svg
    ├── data+_picture.png
    ├── project+_picture.webp
    └── udacity_logo.webp
```

### Modular Version (Recommended for scaling)
See the `components/` folder for individual component files:
- `Header.jsx` - Top navigation and profile
- `AboutSection.jsx` - About me section
- `Certifications.jsx` - Certification carousel
- `Resume.jsx` - Education, skills, experience
- `ContactForm.jsx` - Contact form
- `Footer.jsx` - Footer component

## Mobile Responsiveness

✅ **You DON'T need separate files for mobile!** 

The CSS already handles mobile with media queries:
- `@media (max-width: 768px)` - Tablet/mobile
- `@media (max-width: 480px)` - Small mobile
- `@media (min-width: 1024px)` - Desktop

React automatically uses the same CSS breakpoints, so your site is fully responsive out of the box!

## Key Differences from Vanilla HTML/JS

### 1. **State Management**
Instead of DOM manipulation, React uses state:
```javascript
// Old way (vanilla JS)
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// New way (React)
const [theme, setTheme] = useState('dark');
const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
```

### 2. **Event Handlers**
```javascript
// Old: onclick attribute
<button onclick="handleClick()">Click</button>

// New: onClick prop
<button onClick={handleClick}>Click</button>
```

### 3. **Dynamic Content**
```javascript
// Old: innerHTML manipulation
element.innerHTML = data.map(item => `<div>${item}</div>`).join('');

// New: JSX mapping
{data.map(item => <div key={item.id}>{item}</div>)}
```

### 4. **Forms**
```html
<!-- HTML: for attribute -->
<label for="email">Email</label>

<!-- React: htmlFor attribute -->
<label htmlFor="email">Email</label>
```

## Features Converted

✅ Particle.js background with theme switching
✅ Typewriter effect for job titles
✅ Scroll progress bar
✅ Image/video hover effect
✅ Animated GPA counters
✅ Swiper carousel for certifications
✅ Theme toggle (dark/light mode)
✅ Contact form (Formspree integration)
✅ Responsive design
✅ All animations and transitions

## Swiper Integration

The certification carousel uses Swiper React components:
```javascript
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

<Swiper
  modules={[Pagination, Keyboard]}
  slidesPerView={1}
  pagination={{ clickable: true }}
>
  <SwiperSlide>Content</SwiperSlide>
</Swiper>
```

## Particles.js Integration

Particles.js is loaded from CDN and initialized via useEffect:
```javascript
useEffect(() => {
  if (window.particlesJS) {
    initParticles();
  }
}, []);
```

## Customization Tips

### Adding New Sections
1. Add to the JSX in `App.jsx`
2. Style in `App.css`
3. Use state for dynamic content

### Changing Colors
Edit CSS variables in `:root` and `.light-mode`:
```css
:root {
  --bg-color: #020003;
  --text-main: rgba(239, 194, 255, 0.8);
  /* ... */
}
```

### Adding New Certifications
Just add to the `certifications` array:
```javascript
const certifications = [
  { img: "path.svg", title: "Cert Name", issued: "Date" },
  // Add more here
];
```

## Deployment

### Build for production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy to:
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Use `gh-pages` branch
- **AWS S3**: Upload `dist/` contents

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Particles.js is destroyed/recreated on theme change to prevent memory leaks
- Images and videos should be optimized before deployment
- Consider lazy loading for images below the fold
- Swiper is configured for optimal mobile performance

## Troubleshooting

### Particles not showing?
- Check console for errors
- Ensure particles.min.js is loaded from CDN
- Verify `#particles-js` div exists

### Swiper not working on mobile?
- Check that Swiper CSS is imported
- Verify breakpoints in Swiper config

### Theme not persisting?
- Check localStorage is enabled in browser
- Verify theme state is synced with localStorage

## Questions?

If you need help customizing or have questions, feel free to ask!
