// likeHandler.js
import { supabase } from "./supabaseClient.js";

/**
 * Initialize like buttons under a given root (default: document)
 * Call this after you render any gallery/list with like buttons.
 */
export async function setupLikeButtons(root = document) {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Option: disable like buttons for anonymous users
    root
      .querySelectorAll("[data-like-btn]")
      .forEach((btn) => btn.setAttribute("disabled", "true"));
    return;
  }

  // Collect all photo_ids visible in this root
  const buttons = Array.from(root.querySelectorAll("[data-like-btn]"));
  const photoIds = [...new Set(buttons.map((b) => Number(b.dataset.photoId)))].filter(
    (id) => !Number.isNaN(id)
  );

  if (!photoIds.length) return;

  // Load which of these photos the user has already liked
  const { data: likedRows, error } = await supabase
    .from("photo_likes")
    .select("photo_id")
    .eq("user_id", user.id)
    .in("photo_id", photoIds);

  if (error) {
    console.error("Error loading liked photos:", error);
    return;
  }

  const likedSet = new Set((likedRows || []).map((r) => r.photo_id));

  // Initialize button state + handlers
  buttons.forEach((btn) => {
    const photoId = Number(btn.dataset.photoId);
    if (Number.isNaN(photoId)) return;

    const isLiked = likedSet.has(photoId);
    setButtonLikedState(btn, isLiked);

    btn.addEventListener("click", async () => {
      await toggleLike(photoId, user.id, btn, likedSet, root);
    });
  });
}

/**
 * Toggle like/unlike for a single photo.
 */
async function toggleLike(photoId, userId, btn, likedSet, root) {
  const countSpan = btn.querySelector("[data-like-count]");
  const currentCount = Number(countSpan?.textContent || "0") || 0;
  const isCurrentlyLiked = likedSet.has(photoId);

  // Optimistic UI update
  const newCount = isCurrentlyLiked ? currentCount - 1 : currentCount + 1;
  updateAllButtonsForPhoto(root, photoId, newCount, !isCurrentlyLiked);

  // DB operations
  try {
    if (isCurrentlyLiked) {
      // UNLIKE: delete from photo_likes + decrement like_count
      const { error: delErr } = await supabase
        .from("photo_likes")
        .delete()
        .eq("user_id", userId)
        .eq("photo_id", photoId);

      if (delErr) throw delErr;

      const { error: decErr } = await supabase
        .from("mug_photos")
        .update({ like_count: newCount })
        .eq("id", photoId);

      if (decErr) throw decErr;

      likedSet.delete(photoId);
      showToast("💔 Like removed");
    } else {
      // LIKE: insert into photo_likes + increment like_count
      const { error: insErr } = await supabase
        .from("photo_likes")
        .insert([{ user_id: userId, photo_id: photoId }]);

      if (insErr) throw insErr;

      const { error: incErr } = await supabase
        .from("mug_photos")
        .update({ like_count: newCount })
        .eq("id", photoId);

      if (incErr) throw incErr;

      likedSet.add(photoId);
      showToast("❤️ Liked!");
    }
  } catch (err) {
    console.error("Error toggling like:", err);

    // Revert UI on error
    const revertCount = isCurrentlyLiked ? currentCount : currentCount;
    updateAllButtonsForPhoto(root, photoId, revertCount, isCurrentlyLiked);
    showToast("Could not update like. Try again.");
  }
}

/**
 * Update all like buttons for the same photo on the page
 * (in case it shows up in multiple places).
 */
function updateAllButtonsForPhoto(root, photoId, newCount, isLiked) {
  const allButtons = root.querySelectorAll(
    `[data-like-btn][data-photo-id="${photoId}"]`
  );
  allButtons.forEach((b) => {
    const span = b.querySelector("[data-like-count]");
    if (span) span.textContent = String(newCount);
    setButtonLikedState(b, isLiked);
  });
}

/**
 * Visually mark button as liked/unliked.
 * You can tweak classes/emoji here to match your design.
 */
function setButtonLikedState(btn, isLiked) {
  if (isLiked) {
    btn.classList.add("mm-like--active");
    btn.innerHTML = `❤️ <span data-like-count>${
      btn.querySelector("[data-like-count]")?.textContent || "0"
    }</span>`;
  } else {
    btn.classList.remove("mm-like--active");
    btn.innerHTML = `🤍 <span data-like-count>${
      btn.querySelector("[data-like-count]")?.textContent || "0"
    }</span>`;
  }
}

/**
 * Simple toast helper (reusable across pages).
 */
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #111827;
      color: white;
      padding: 10px 16px;
      border-radius: 9999px;
      border: 1px solid #4b5563;
      z-index: 9999;
      font-size: 0.9rem;
      display: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 1500);
}
