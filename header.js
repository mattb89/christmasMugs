export async function initHeader(options = {}) {
  const {
    containerId = "mm-header",
    headerPath = "header.html",
  } = options;

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`[initHeader] No container with id="${containerId}" found.`);
    return;
  }

  let response;
  try {
    response = await fetch(headerPath, { cache: "no-cache" });
  } catch (err) {
    console.error("[initHeader] Failed to fetch header:", err);
    return;
  }

  if (!response.ok) {
    console.error(
      `[initHeader] Failed to load ${headerPath}: ${response.status} ${response.statusText}`
    );
    return;
  }

  const html = await response.text();
  container.innerHTML = html;

  wireHeaderNav();
}

/**
 * Wire up hamburger / overlay / ESC / link-click close behavior.
 * Assumes header.html has been inserted into the DOM.
 */
let _navKeyHandlerAttached = false;

function wireHeaderNav() {
  const mmHamburger = document.getElementById("mmHamburger");
  const mmNavOverlay = document.getElementById("mmNavOverlay");
  const mmNavClose = document.getElementById("mmNavClose");
  const navLinks =
    (mmNavOverlay && mmNavOverlay.querySelectorAll(".mm-nav-link")) || [];

  if (!mmNavOverlay) {
    console.warn("[wireHeaderNav] #mmNavOverlay not found in DOM.");
    return;
  }

  function isOpen() {
    return mmNavOverlay.getAttribute("aria-hidden") === "false";
  }

  function openNav() {
    mmNavOverlay.style.display = "block";
    mmNavOverlay.setAttribute("aria-hidden", "false");
    if (mmHamburger) {
      mmHamburger.setAttribute("aria-expanded", "true");
    }
  }

  function closeNav() {
    mmNavOverlay.style.display = "none";
    mmNavOverlay.setAttribute("aria-hidden", "true");
    if (mmHamburger) {
      mmHamburger.setAttribute("aria-expanded", "false");
    }
  }

  function toggleNav() {
    if (isOpen()) {
      closeNav();
    } else {
      openNav();
    }
  }

  // Hamburger click toggles menu
  if (mmHamburger) {
    mmHamburger.addEventListener("click", toggleNav);

    // Keyboard support (Enter / Space)
    mmHamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleNav();
      }
    });
  }

  // X button closes
  if (mmNavClose) {
    mmNavClose.addEventListener("click", closeNav);
  }

  // Clicking any nav link closes
  navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  // Clicking on the dark overlay (but not inside the content) closes
  mmNavOverlay.addEventListener("click", (e) => {
    if (e.target === mmNavOverlay) {
      closeNav();
    }
  });

  // ESC key closes (only attach once per page)
  if (!_navKeyHandlerAttached) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
    _navKeyHandlerAttached = true;
  }
}

/**
 * Helper to get auth-related elements from the header.
 * Use this in your page scripts to wire Supabase login/logout.
 */
export function getHeaderAuthElements() {
  return {
    loginGoogleButton: document.getElementById("loginGoogleButton"),
    loginEmailButton: document.getElementById("loginEmailButton"),
    logoutButton: document.getElementById("logoutButton"),
    authAvatar: document.getElementById("authAvatar"),
    authUserLabel: document.getElementById("authUserLabel"),
    dashboardLinkContainer: document.getElementById("dashboardLinkContainer"),
    adminLinkContainer: document.getElementById("adminLinkContainer"),
  };
}