const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];

function closeMenu() {
  sidebar?.classList.remove("open");
  overlay?.classList.remove("open");
  document.body.classList.remove("mobile-menu-open");
}

function setActivePage() {
  const currentPage = document.body.dataset.page;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === currentPage);
  });
}

menuToggle?.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 820px)").matches) {
    sidebar?.classList.toggle("open");
    overlay?.classList.toggle("open");
    document.body.classList.toggle("mobile-menu-open", sidebar?.classList.contains("open"));
    return;
  }

  document.body.classList.toggle("sidebar-collapsed");
});

overlay?.addEventListener("click", closeMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));
setActivePage();
