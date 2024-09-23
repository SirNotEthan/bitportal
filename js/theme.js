document.addEventListener('DOMContentLoaded', () => {
    // Check if dark mode is enabled
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    const darkModeToggle = document.querySelector('.dark-mode');

    if (isDarkMode) {
        document.body.classList.add('dark-mode-variables');
        if (darkModeToggle) {
            darkModeToggle.querySelector('span:nth-child(1)').classList.remove('active');
            darkModeToggle.querySelector('span:nth-child(2)').classList.add('active');
        }
    }

    // Listen for dark mode toggle button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode-variables');
            const isDark = document.body.classList.contains('dark-mode-variables');
            localStorage.setItem('darkMode', isDark);

            darkModeToggle.querySelector('span:nth-child(1)').classList.toggle('active');
            darkModeToggle.querySelector('span:nth-child(2)').classList.toggle('active');
        });
    }
});
