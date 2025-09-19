// Disable right click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'u')
    ) {
        e.preventDefault();
    }
});

// Disable text selection
document.addEventListener('selectstart', (e) => e.preventDefault());

// Clear console on open
console.clear();
setInterval(() => {
    console.clear();
}, 1000);

// Add warning message
console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0 #000;');
console.log('%cThis is a protected page.', 'color: red; font-size: 20px;');