class MobileNavbar {
    constructor(menuSelector, navListSelector, navLinksSelector) {
        this.menu = document.querySelector(menuSelector);
        this.navList = document.querySelector(navListSelector);
        this.navLinks = document.querySelectorAll(navLinksSelector);
        this.overlay = document.querySelector('#overlay');
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleClick() {
        const expanded = this.menu.getAttribute('aria-expanded') === 'true';
        // toggle ARIA
        this.menu.setAttribute('aria-expanded', String(!expanded));
        this.navList.setAttribute('aria-hidden', String(expanded));
        // toggle classes
        this.navList.classList.toggle(this.activeClass);
        this.menu.classList.toggle('open'); // opcional: animação do hamburger
        if (this.overlay) this.overlay.classList.toggle('visible');
    }

    handleKeyDown(e) {
        if (e.key === 'Escape') {
            const expanded = this.menu.getAttribute('aria-expanded') === 'true';
            if (expanded) this.handleClick();
        }
    }

    addClickEvent() {
        if (this.menu) this.menu.addEventListener("click", this.handleClick);
        if (this.overlay) this.overlay.addEventListener("click", this.handleClick);
        this.navLinks.forEach(link => link.addEventListener("click", this.handleClick));
        document.addEventListener("keydown", this.handleKeyDown);
    }

    init() {
        if (!this.menu || !this.navList) return this;
        // estado inicial ARIA
        if (!this.menu.hasAttribute("aria-expanded")) this.menu.setAttribute("aria-expanded", "false");
        if (!this.navList.hasAttribute("aria-hidden")) this.navList.setAttribute("aria-hidden", "true");
        this.addClickEvent();
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    "#hamburgerBtn",
    "#sideNav",
    "#sideNav li"
);
mobileNavbar.init();