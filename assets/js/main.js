document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const submenuItems = document.querySelectorAll('.has-submenu');

    // --- Mobile Menu Logic ---
    if (navToggle && mainNav) {
        // Toggle menu on button click
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            navToggle.classList.toggle('is-active');
        });

        // Close menu when a link inside is clicked
        mainNav.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                mainNav.classList.remove('is-active');
                navToggle.classList.remove('is-active');
            }
        });
    }

    // --- Desktop Submenu Logic ---
    submenuItems.forEach((item) => {
        const link = item.querySelector('a');
        link.addEventListener('click', (event) => {
            // Apply only on desktop
            if (window.innerWidth > 768) {
                event.preventDefault();
                const isActive = item.classList.contains('is-active');
                // Close all other submenus
                submenuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('is-active');
                    }
                });
                // Toggle the current one
                item.classList.toggle('is-active');
            }
        });
    });

    // --- Global Click Listener to Close Menus ---
    document.addEventListener('click', (event) => {
        // Close mobile menu if click is outside the nav and the toggle
        if (mainNav && mainNav.classList.contains('is-active')) {
            if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
                mainNav.classList.remove('is-active');
                navToggle.classList.remove('is-active');
            }
        }

        // Close desktop submenu if click is outside the submenu parent
        const activeSubmenu = document.querySelector('.has-submenu.is-active');
        if (activeSubmenu && !activeSubmenu.contains(event.target)) {
            activeSubmenu.classList.remove('is-active');
        }
    });
});