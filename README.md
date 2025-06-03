# Europa Hauptstädte Quiz

A German-language quiz application for learning European capitals. Built with vanilla JavaScript, HTML, and CSS.

## Features

- Interactive flashcard-style quiz
- Timer with adjustable speed settings (5s, 7s, 10s)
- Score tracking (correct/wrong/total)
- Progress bar showing quiz completion
- Responsive design for mobile and desktop
- Keyboard shortcuts for faster navigation

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yowmamasita/capitals.git
cd capitals
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Project Structure

```
capitals/
├── public/
│   ├── index.html      # Main HTML file
│   ├── script.js       # Quiz logic and interactions
│   └── style.css       # Styling
├── quiz.jpeg           # Quiz image asset
├── package.json        # Project dependencies
└── README.md          # This file
```

### Available Scripts

- `npm start` - Starts the development server on port 3000
- `npm install` - Installs project dependencies

### Keyboard Shortcuts

- **Space** - Show answer
- **Arrow Up** - Mark as correct
- **Arrow Down** - Mark as wrong
- **Arrow Right** - Next card

### Customization

#### Adding/Removing Countries

Edit the `capitals` array in `public/script.js`:

```javascript
const capitals = [
    { country: "Deutschland", capital: "Berlin" },
    // Add more countries here
];
```

#### Changing Timer Speeds

Modify the timer options in `public/index.html`:

```html
<button class="timer-option" data-speed="10">Langsam (10s)</button>
```

## Deployment

The app can be deployed to any static hosting service:

1. Upload the contents of the `public/` directory
2. Ensure the web server is configured to serve `index.html` as the default page

## License

This project is open source and available under the MIT License.

## Author

Made with ❤️ for Julian