// gallery.js

const LIKE_STORAGE_KEY = "mugMapLikes_v1";

function loadLikedMap() {
  try {
    const raw = localStorage.getItem(LIKE_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveLikedMap(map) {
  try {
    localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    // ignore storage errors
  }
}

let likedMap = loadLikedMap();

function isLiked(photoId) {
  return !!likedMap[photoId];
}

function toggleLike(photoId) {
  if (isLiked(photoId)) {
    delete likedMap[photoId];
  } else {
    likedMap[photoId] = true;
  }
  saveLikedMap(likedMap);
}

function getBaseLikes(photoId) {
  if (typeof BASE_LIKES !== "undefined" && BASE_LIKES[photoId] != null) {
    return BASE_LIKES[photoId];
  }
  return 0;
}

function getTotalLikes(photoId) {
  return getBaseLikes(photoId) + (isLiked(photoId) ? 1 : 0);
}

// Expose this so popular.html can sort by likes
window.getTotalLikes = getTotalLikes;

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

    // If caller already passed a tag (e.g., "23 likes") use it;
    // otherwise fall back to the photo's tag or year.
    if (photo.tag) {
      tagSpan.textContent = photo.tag;
    } else if (photo.year) {
      tagSpan.textContent = photo.year;
    } else {
      tagSpan.textContent = "";
    }

    info.appendChild(labelSpan);
    info.appendChild(tagSpan);

    // Like button
    const likeBtn = document.createElement("button");
    likeBtn.type = "button";
    likeBtn.className = "like-btn";
    likeBtn.dataset.photoId = photo.id;

    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤";

    const count = document.createElement("span");
    const totalLikes = getTotalLikes(photo.id);
    count.textContent = totalLikes;

    if (isLiked(photo.id)) {
      likeBtn.classList.add("liked");
    }

    likeBtn.appendChild(heart);
    likeBtn.appendChild(count);

    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // don't open lightbox
      toggleLike(photo.id);
      const newTotal = getTotalLikes(photo.id);
      count.textContent = newTotal;
      likeBtn.classList.toggle("liked", isLiked(photo.id));

      // Optional hook so a page can resort (e.g. popular.html)
      if (typeof context.onLikesChanged === "function") {
        context.onLikesChanged();
      }
    });

    item.appendChild(img);
    item.appendChild(info);
    item.appendChild(likeBtn);
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

  const city = context.city || photo.city || "";
  const marketName = context.marketName || photo.marketName || "";
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
  if (photo.year) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = photo.year;
    chipsEl.appendChild(chip);
  }

  // Show likes in the meta chips as well
  const likesChip = document.createElement("span");
  likesChip.className = "chip";
  likesChip.textContent = `${getTotalLikes(photo.id)} likes`;
  chipsEl.appendChild(likesChip);
}
