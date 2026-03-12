import { requireAuth } from "./auth.js";
import { renderTopNav } from "./nav.js";

const MENU = {
  admin: [
    { href: "./tpa-form.html", title: "TPA Form", description: "Submit classroom observations." },
    { href: "./teachers.html", title: "Teacher Details", description: "Create and update teacher records." },
    { href: "./summary.html", title: "TPA Summary", description: "View aggregated observation summaries." },
    { href: "./dashboard.html", title: "Dashboard", description: "View live school performance charts." },
  ],
  observer: [
    { href: "./tpa-form.html", title: "TPA Form", description: "Submit classroom observations." },
    { href: "./teachers.html", title: "Teacher Details", description: "Manage teacher details." },
    { href: "./summary.html", title: "TPA Summary", description: "Review observation summaries." },
    { href: "./dashboard.html", title: "Dashboard", description: "View charts and completion status." },
  ],
  viewer: [
    { href: "./summary.html", title: "TPA Summary", description: "Review observation summaries." },
    { href: "./dashboard.html", title: "Dashboard", description: "View charts and completion status." },
  ],
};

async function init() {
  const status = document.getElementById("landingStatus");
  status.textContent = "Loading...";

  const { role, profile } = await requireAuth();
  renderTopNav({ role, profile, current: "" });

  const menu = document.getElementById("landingMenu");
  const items = MENU[role] || MENU.viewer;
  menu.innerHTML = items
    .map(
      (item) => `<a class="menu-card" href="${item.href}"><h3>${item.title}</h3><p>${item.description}</p></a>`,
    )
    .join("");

  status.textContent = "";
}

init();
