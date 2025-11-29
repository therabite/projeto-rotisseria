// Please see documentation at htt
ps://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
class MobileNavbar {
    constructor(menu, navList, navLinks) {
        this.menu = document.querySelector(menu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind();
    }

    handleClick() {
        console.log(this);
        this.navList.classList.toggle(this.activeClass);
    }

    addClickEvent() {
        this.menu.addEventListener("click", this.handleClick);
    }
    init() {
        if (this.menu) {
            this.addClickEvent();
        }
        return this;
    }
}
const menuNavbar = new menuNavbar(
    ".menu",
    ".nav-list",
    ".nav-list li"
);
menuNavbar.init();
