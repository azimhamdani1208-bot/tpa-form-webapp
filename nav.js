import { signOutUser } from "./auth.js";

const ROLE_LINKS = {
  admin: ["teachers", "tpa-form", "summary", "dashboard"],
  observer: ["teachers", "tpa-form", "summary", "dashboard"],
  viewer: ["summary", "dashboard"],
};

const ALL_LINKS = {
  teachers: { href: "./teachers.html", label: "Teacher Details" },
  "tpa-form": { href: "./tpa-form.html", label: "TPA Form" },
  summary: { href: "./summary.html", label: "TPA Summary" },
  dashboard: { href: "./dashboard.html", label: "Dashboard" },
};

export function renderTopNav({ role, profile, current }) {
  const nav = document.getElementById("topNav");
  if (!nav) return;

  const allowed = ROLE_LINKS[role] || ROLE_LINKS.viewer;
  const linkHtml = allowed
    .map((key) => {
      const link = ALL_LINKS[key];
      const active = current === key ? "active" : "";
      return `<a class="nav-link ${active}" href="${link.href}">${link.label}</a>`;
    })
    .join("");

  nav.innerHTML = `
    <div class="nav-links">${linkHtml}</div>
    <div class="nav-user">
      <span>${profile.name || "User"} (${role})</span>
      <button id="logoutBtn" class="btn secondary">Logout</button>
    </div>
  `;

  document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    await signOutUser();
    window.location.href = "./login.html";
  });
}
