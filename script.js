const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');

// Making the canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize; // Number of columns for the rain
const drops = [];

// Initialize the drops (one per column)
for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height / fontSize;
}

// Define the characters (full ASCII set)
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()*&^%+-/~{[|`]';

// The draw function
function draw() {
    // Clear the background with a slight opacity to create the fading effect
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Set the color for the letters
    context.fillStyle = '#0F0';
    context.font = `${fontSize}px monospace`;

    // Loop over drops array
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character from the characters string
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Draw the character at the current position
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        // Randomly reset the drop if it goes off the screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move the drop down one row
        drops[i]++;
    }
}

// Run the draw function every 50ms
setInterval(draw, 50);

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
