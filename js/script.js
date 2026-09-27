window.addEventListener('load', () => {
    const landing = document.getElementById('landing-overlay');
    if (!landing) return;  

    
    if (localStorage.getItem('gigi_intro_seen') === '1') {
        landing.remove();
        return;
    }

    
    setTimeout(() => {
        landing.classList.add('hidden');
        localStorage.setItem('gigi_intro_seen', '1');  
        setTimeout(() => landing.remove(), 900);
    }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const dropdown = document.getElementById('dropdown');
    const popupBtn = document.getElementById('popup-btn');
    const heroPopupBtn = document.getElementById('hero-popup-btn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    if (popupBtn && modal) {
        popupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    if (heroPopupBtn && modal) {
        heroPopupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});