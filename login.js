import { auth, onAuthStateChanged } from "./firebase.js";
import { getUserRole, signInUser } from "./auth.js";

const form = document.getElementById("loginForm");
const status = document.getElementById("loginStatus");
const button = document.getElementById("loginBtn");

function setStatus(message, type = "") {
  status.className = `status ${type}`;
  status.textContent = message;
}

function redirectByRole() {
  window.location.href = "./dashboard.html";
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    await getUserRole(user.uid);
    redirectByRole();
  }
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    button.disabled = true;
    setStatus("Signing in...");
    const credential = await signInUser(email, password);
    const role = await getUserRole(credential.user.uid);
    console.log("[login] Signed in with role", role);
    redirectByRole();
  } catch (error) {
    console.error("[login] Sign-in failed", error);
    setStatus("Login failed. Please check your credentials.", "error");
  } finally {
    button.disabled = false;
  }
});
