// auth.js
import { supabase } from "./supabaseClient.js";
import { getHeaderAuthElements } from "./header.js";

export async function initAuth() {
  const {
    loginGoogleButton,
    loginEmailButton,
    logoutButton,
    authAvatar,
    authUserLabel,
    dashboardLinkContainer,
    adminLinkContainer,
  } = getHeaderAuthElements();

  // 1) Check current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error getting auth session:", sessionError);
  }

  const user = session?.user ?? null;

  // 2) Update header UI based on user state
  if (!user) {
    // Not logged in
    if (authUserLabel) authUserLabel.textContent = "Not signed in";
    if (loginGoogleButton) loginGoogleButton.style.display = "inline-flex";
    if (loginEmailButton) loginEmailButton.style.display = "inline-flex";
    if (logoutButton) logoutButton.style.display = "none";
    if (authAvatar) authAvatar.style.display = "none";

    if (dashboardLinkContainer) dashboardLinkContainer.innerHTML = "";
    if (adminLinkContainer) adminLinkContainer.innerHTML = "";
  } else {
    // Logged in
    const email = user.email ?? "Signed in";
    if (authUserLabel) authUserLabel.textContent = email;

    if (loginGoogleButton) loginGoogleButton.style.display = "none";
    if (loginEmailButton) loginEmailButton.style.display = "none";
    if (logoutButton) logoutButton.style.display = "inline-flex";

    // avatar (if provided by Google)
    if (authAvatar) {
      const pic = user.user_metadata?.avatar_url;
      if (pic) {
        authAvatar.src = pic;
        authAvatar.style.display = "block";
      } else {
        authAvatar.style.display = "none";
      }
    }

    // Dashboard link for any logged-in user
    if (dashboardLinkContainer) {
      dashboardLinkContainer.innerHTML =
        '<a href="dashboard.html" class="mm-nav-link">👤 My Dashboard</a>';
    }

    // Admin link based on admin_users table
    if (adminLinkContainer) {
      const { data: adminRow, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!adminError && adminRow) {
        adminLinkContainer.innerHTML =
          '<a href="admin.html" class="mm-nav-link">🛠️ Admin Panel</a>';
      } else {
        adminLinkContainer.innerHTML = "";
      }
    }
  }

  // 3) Wire button click handlers

  // Google sign-in: OAuth popup/redirect
  if (loginGoogleButton) {
    loginGoogleButton.onclick = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.href
        },
      });
      if (error) {
        console.error("Google sign-in error:", error);
        alert("Google sign-in failed. Please try again.");
      }
    };
  }

  // Email sign-in: magic link to the entered email
  if (loginEmailButton) {
    loginEmailButton.onclick = async () => {
      const email = window.prompt("Enter your email for a magic link:");
      if (!email) return;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href
        },
      });

      if (error) {
        console.error("Email sign-in error:", error);
        alert("Email sign-in failed. Please try again.");
      } else {
        alert("Check your email for a magic link to sign in.");
      }
    };
  }

  // Logout
  if (logoutButton) {
    logoutButton.onclick = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign-out error:", error);
        alert("Sign-out failed. Please try again.");
        return;
      }
      // Reload to refresh header + page state
      window.location.reload();
    };
  }
}
