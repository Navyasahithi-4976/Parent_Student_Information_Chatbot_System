# Parent Verification and Student Information Chatbot System - Login Page

A modern, responsive login page built with React, CSS, and JavaScript for the Parent Verification and Student Information Chatbot System.

## Features

- **Two-column design** matching the provided UI/UX mockup
- **Dark left column** with login form including:
  - Username and password fields
  - Form validation with error messages
  - Forgot password link
  - Login button with hover effects
  - Sign up link
- **Purple right column** with welcome content:
  - Welcome title and subtitle
  - Lottie animation placeholder (ready for your animation file)
  - Animated placeholder elements
- **Responsive design** for mobile, tablet, and desktop
- **Modern UI elements** with gradients, shadows, and transitions
- **Form validation** with real-time error handling

## Project Structure

```
PTM/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   └── Login.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Lottie Animation Integration

The login page includes a placeholder for Lottie animation in the right column. To integrate your Lottie file:

1. Install lottie-web (already included in devDependencies):
```bash
npm install lottie-web
```

2. Replace the placeholder content in `src/components/Login.js`:

```javascript
import lottie from 'lottie-web';

// In your component, add:
useEffect(() => {
  const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/path/to/your/animation.json'
  });

  return () => animation.destroy();
}, []);
```

## Customization

### Colors
- Left column background: Linear gradient from `#1a1a2e` to `#16213e`
- Right column background: Linear gradient from `#6c63ff` to `#a29bfe`
- Primary button: `#6c63ff` with hover effects

### Typography
- Font family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Responsive font sizes for different screen sizes

### Form Validation
- Username: Required field
- Password: Required, minimum 6 characters
- Real-time validation with error messages

## Responsive Breakpoints

- **Desktop**: 768px and above (side-by-side layout)
- **Tablet**: 481px - 767px (stacked layout with adjusted sizing)
- **Mobile**: 480px and below (compact stacked layout)

## Future Enhancements

- Integration with backend authentication system
- OTP-based authentication
- Multi-language support
- Accessibility improvements
- Additional animation effects
- Theme switching capability

## Technologies Used

- **React 18.2.0** - UI framework
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Form validation and interactions
- **Lottie-web** - Animation support (prepared for integration)

## License

This project is part of the Parent Verification and Student Information Chatbot System.
