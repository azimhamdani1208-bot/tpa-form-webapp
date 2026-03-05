import { onAuthStateChanged, auth } from "./firebase.js";
import { signInUser, getUserRole } from "./auth.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("loginError");

function setError(message) {
  if (errorEl) {
    errorEl.textContent = message || "";
  }
}

function redirectByRole(role) {
  if (role === "viewer") {
    window.location.href = "./dashboard.html";
    return;
  }
  window.location.href = "./index.html";
}

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const role = await getUserRole(user.uid);
    redirectByRole(role);
  }
});

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setError("");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    try {
      const credential = await signInUser(email, password);
      const role = await getUserRole(credential.user.uid);
      redirectByRole(role);
    } catch (error) {
      setError("Log masuk gagal. Sila semak emel atau kata laluan.");
      console.error("Login error", error);
    }
  });
}
