const stops = {
  entrance: {
    title: "Front Stair and Palace Form",
    copy:
      "The raised timber form and broad stair make the building feel ceremonial before visitors even enter. This first view introduces the palace as both architecture and symbol.",
  },
  gallery: {
    title: "Main Gallery",
    copy:
      "Inside the museum, historical displays can connect visitors to the rulers, family lines, and public life of the Gowa Kingdom through photographs, texts, and objects.",
  },
  regalia: {
    title: "Royal Regalia",
    copy:
      "Royal objects such as crowns, jewelry, keris, and ceremonial weapons are not just beautiful artifacts. They explain authority, ritual, craft, and identity.",
  },
};

const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
const panorama = document.querySelector(".panorama");
const hotspots = [...document.querySelectorAll(".hotspot")];
const stopTitle = document.querySelector("#stop-title");
const stopCopy = document.querySelector("#stop-copy");

let panPosition = 50;
let isDragging = false;
let dragStart = 0;
let startPosition = 50;

function closeMenu() {
  sidebar?.classList.remove("open");
  overlay?.classList.remove("open");
}

function setActivePage() {
  const currentPage = document.body.dataset.page;
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === currentPage);
  });
}

function setPan(value) {
  if (!panorama) return;
  panPosition = Math.max(0, Math.min(100, value));
  panorama.style.backgroundPosition = `${panPosition}% center`;
}

function setStop(stopName) {
  const stop = stops[stopName];
  if (!stop || !stopTitle || !stopCopy) return;

  stopTitle.textContent = stop.title;
  stopCopy.textContent = stop.copy;

  hotspots.forEach((hotspot) => {
    hotspot.classList.toggle("active", hotspot.dataset.stop === stopName);
  });
}

menuToggle?.addEventListener("click", () => {
  sidebar?.classList.toggle("open");
  overlay?.classList.toggle("open");
});

overlay?.addEventListener("click", closeMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));
setActivePage();

if (panorama) {
  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("click", () => setStop(hotspot.dataset.stop));
  });

  document.querySelectorAll("[data-pan]").forEach((button) => {
    button.addEventListener("click", () => setPan(panPosition + Number(button.dataset.pan)));
  });

  panorama.addEventListener("pointerdown", (event) => {
    isDragging = true;
    dragStart = event.clientX;
    startPosition = panPosition;
    panorama.classList.add("dragging");
    panorama.setPointerCapture(event.pointerId);
  });

  panorama.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const delta = ((event.clientX - dragStart) / panorama.clientWidth) * 75;
    setPan(startPosition - delta);
  });

  panorama.addEventListener("pointerup", () => {
    isDragging = false;
    panorama.classList.remove("dragging");
  });

  panorama.addEventListener("pointercancel", () => {
    isDragging = false;
    panorama.classList.remove("dragging");
  });

  setPan(panPosition);
}
