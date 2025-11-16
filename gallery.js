// gallery.js

// Renders a simple grid gallery into a container element
function renderGallery(container, photos, context = {}) {
  container.innerHTML = "";
  photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.dataset.index = index;

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.label || "Mug photo";

    const info = document.createElement("div");
    info.className = "gallery-item-info";

    const labelSpan = document.createElement("span");
    labelSpan.textContent = photo.label || "Untitled";

    const tagSpan = document.createElement("span");
    tagSpan.className = "gallery-item-tag";
    tagSpan.textContent = photo.tag || (photo.year ? photo.year : "");

    info.appendChild(labelSpan);
    info.appendChild(tagSpan);

    item.appendChild(img);
    item.appendChild(info);
    container.appendChild(item);

    item.addEventListener("click", () => {
      openLightbox(photos, index, context);
    });
  });
}

/* Lightbox logic */

let lightboxState = {
  photos: [],
  index: 0,
  context: {},
};

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const prevBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");
  const closeBtn = document.querySelector(".lightbox-close");

  prevBtn.addEventListener("click", () => changeLightboxIndex(-1));
  nextBtn.addEventListener("click", () => changeLightboxIndex(1));
  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    // Close when clicking backdrop (but not when clicking content)
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("visible")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") changeLightboxIndex(1);
    if (e.key === "ArrowLeft") changeLightboxIndex(-1);
  });
}

function openLightbox(photos, index, context = {}) {
  lightboxState.photos = photos;
  lightboxState.index = index;
  lightboxState.context = context;

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  updateLightbox();
  lightbox.classList.add("visible");
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("visible");
}

function changeLightboxIndex(delta) {
  const { photos } = lightboxState;
  if (!photos || photos.length === 0) return;

  let newIndex = lightboxState.index + delta;
  if (newIndex < 0) newIndex = photos.length - 1;
  if (newIndex >= photos.length) newIndex = 0;

  lightboxState.index = newIndex;
  updateLightbox();
}

function updateLightbox() {
  const { photos, index, context } = lightboxState;
  if (!photos || photos.length === 0) return;

  const photo = photos[index];
  const imgEl = document.getElementById("lightbox-image");
  const titleEl = document.getElementById("lightbox-title");
  const subtitleEl = document.getElementById("lightbox-subtitle");
  const chipsEl = document.getElementById("lightbox-chips");

  imgEl.src = photo.src;
  imgEl.alt = photo.label || "Mug photo";

  const city = context.city || "";
  const marketName = context.marketName || "";
  const year = photo.year ? ` · ${photo.year}` : "";

  titleEl.textContent = photo.label || "Mug Photo";
  subtitleEl.textContent = `${marketName || city}${year}`;

  chipsEl.innerHTML = "";

  if (photo.tag) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = photo.tag;
    chipsEl.appendChild(chip);
  }
  if (city) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = city;
    chipsEl.appendChild(chip);
  }
  if (year) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = photo.year;
    chipsEl.appendChild(chip);
  }
}
