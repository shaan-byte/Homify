// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggler = document.getElementById('themeToggler');
    const icon = themeToggler.querySelector('i');
    const htmlElement = document.documentElement;
    const navbar = document.querySelector('.navbar');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggler.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        navbar.setAttribute('data-theme', theme);
        
        // Update icon
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            navbar.classList.remove('bg-light');
            navbar.classList.add('bg-dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            navbar.classList.remove('bg-dark');
            navbar.classList.add('bg-light');
        }
    }
});