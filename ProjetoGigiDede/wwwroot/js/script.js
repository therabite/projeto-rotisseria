/*document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.hamburguer') || document.querySelector('.hamburger') || document.getElementById('hamburgerBtn');
    const nav = document.querySelector('#sideNav') || document.querySelector('.side-nav');
    const overlay = document.querySelector('#overlay');
    const body = document.body;
    const OPEN_CLASS = 'nav-open';

    if (!btn || !nav) return;

    function openNav() {
        if (!body.classList.contains(OPEN_CLASS)) {
            body.classList.add(OPEN_CLASS);
            btn.setAttribute('aria-expanded', 'true');
            nav.setAttribute('aria-hidden', 'false');
            if (overlay) overlay.setAttribute('aria-hidden', 'false');
            // opcional: bloquear scroll
            body.style.overflow = 'hidden';
        }
    }

    function closeNav() {
        if (body.classList.contains(OPEN_CLASS)) {
            body.classList.remove(OPEN_CLASS);
            btn.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
            if (overlay) overlay.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
            btn.focus();
        }
    }

    function toggleNav() {
        body.classList.contains(OPEN_CLASS) ? closeNav() : openNav();
    }

    // clique no botão
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNav();
    });

    // clique no overlay (se existir) fecha
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNav();
        });
    }

    // fallback: clique fora do nav e do botão fecha o menu
    document.addEventListener('click', (e) => {
        if (!body.classList.contains(OPEN_CLASS)) return;
        const path = e.composedPath ? e.composedPath() : (e.path || []);
        // verifica se o clique foi dentro do nav ou dentro do botão
        const clickedInsideNav = nav.contains(e.target) || path.includes(nav);
        const clickedOnBtn = btn.contains(e.target) || path.includes(btn);
        if (!clickedInsideNav && !clickedOnBtn) closeNav();
    });

    // fecha com Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
    });

    // fecha ao clicar em link do menu
    Array.from(nav.querySelectorAll('a')).forEach(a => {
        a.addEventListener('click', () => closeNav());
    });

    // estado ARIA inicial
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
    if (!nav.hasAttribute('aria-hidden')) nav.setAttribute('aria-hidden', 'true');
    if (overlay && !overlay.hasAttribute('aria-hidden')) overlay.setAttribute('aria-hidden', 'true');
}); */