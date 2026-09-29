window.addEventListener('load', () => {
    const landing = document.getElementById('landing-overlay');
    if (!landing) return;

    
    const revealHome = () => {
        document.body.classList.remove('home-loading');
        document.body.classList.add('home-ready');
    };

    
    if (localStorage.getItem('gigi_intro_seen') === '1') {
        landing.remove();
        requestAnimationFrame(() => {
            setTimeout(revealHome, 60);
        });
        return;
    }

    
    setTimeout(() => {
        
        landing.classList.add('hidden');
        localStorage.setItem('gigi_intro_seen', '1');

       
        revealHome();

        
        setTimeout(() => landing.remove(), 2800);
    }, 4000);
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

/* ==================== GIGI SIGNUP MODAL (shared) ==================== */
document.addEventListener('DOMContentLoaded', () => {
    const signupModal = document.getElementById('gigiSignupModal');
    if (!signupModal) return;

    const pageKey = signupModal.dataset.page; // 'home' or 'contact'
    if (!pageKey) return;

    const storageKey = `gigi_signup_auto_seen_${pageKey}`;

    // Decide delay before auto-showing
    let delay = 2500; // default for returning visitors / contact
    if (pageKey === 'contact') {
        delay = 400;
    } else if (pageKey === 'home' && localStorage.getItem('gigi_intro_seen') !== '1') {
        // First-ever visit on home → wait until the intro overlay finishes
        delay = 9000;
    }

    // Auto-show once per page (tracked in localStorage)
    if (localStorage.getItem(storageKey) !== '1') {
        setTimeout(() => {
            signupModal.classList.add('active');
            localStorage.setItem(storageKey, '1');
        }, delay);
    }

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && signupModal.classList.contains('active')) {
            closeSignupModal();
        }
    });
});

function closeSignupModal() {
    const m = document.getElementById('gigiSignupModal');
    if (m) m.classList.remove('active');
}

function handleSignupBackdropClick(e) {
    if (e.target.id === 'gigiSignupModal') closeSignupModal();
}

function handleSignupSubmit(e) {
    e.preventDefault();
    const input    = document.getElementById('gigiSignupEmail');
    const feedback = document.getElementById('gigiSignupFeedback');
    const form     = document.getElementById('gigiSignupForm');
    const success  = document.getElementById('gigiSignupSuccess');
    const card     = document.querySelector('.gigi-signup-card');
    const email    = input.value.trim();

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
        card.classList.add('shake');
        feedback.textContent = 'POR FAVOR, INTRODUCE UN CORREO VÁLIDO.';
        setTimeout(() => card.classList.remove('shake'), 400);
        return;
    }

    feedback.textContent = '';
    form.style.display = 'none';
    success.style.display = 'block';
}

function resetSignupModal() {
    const form     = document.getElementById('gigiSignupForm');
    const success  = document.getElementById('gigiSignupSuccess');
    const feedback = document.getElementById('gigiSignupFeedback');
    const input    = document.getElementById('gigiSignupEmail');
    form.reset();
    form.style.display = '';
    success.style.display = 'none';
    feedback.textContent = '';
    input.focus();
}