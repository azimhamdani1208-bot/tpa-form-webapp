import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  db,
} from "./firebase.js";
import { requireAuth, signOutUser } from "./auth.js";

const dashboardContent = document.getElementById("dashboardContent");
const dashboardRole = document.getElementById("dashboardRole");
const btnExport = document.getElementById("btnExport");
const btnNewSubmission = document.getElementById("btnNewSubmission");
const btnLogout = document.getElementById("btnLogout");

let cachedSubmissions = [];

function formatTimestamp(value) {
  if (!value) return "";
  if (typeof value.toDate === "function") {
    return value.toDate().toISOString().split("T")[0];
  }
  return String(value);
}

function buildRows(submissions) {
  return submissions.map((item) => {
    return {
      id: item.id,
      teacher: item.meta?.metaTeacher || "",
      evaluator: item.meta?.metaEvaluator || "",
      date: item.meta?.metaDate || "",
      school: item.meta?.metaSchool || "",
      average: item.averages?.overall ?? "",
      grade: item.averages?.mapped?.grade ?? "",
      createdAt: formatTimestamp(item.createdAt),
      createdBy: item.createdBy || "",
    };
  });
}

function renderTable(submissions) {
  if (!dashboardContent) return;
  if (!submissions.length) {
    dashboardContent.innerHTML = "<div class=\"dashboard-empty\">Tiada rekod penilaian ditemui.</div>";
    return;
  }

  const rows = buildRows(submissions);
  const bodyRows = rows
    .map(
      (row) => `
        <tr>
          <td>${row.teacher}</td>
          <td>${row.evaluator}</td>
          <td>${row.date}</td>
          <td>${row.school}</td>
          <td>${row.average}</td>
          <td>${row.grade}</td>
          <td>${row.createdAt}</td>
          <td>${row.createdBy}</td>
        </tr>
      `
    )
    .join("");

  dashboardContent.innerHTML = `
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>Nama Guru</th>
          <th>Penilai</th>
          <th>Tarikh</th>
          <th>Sekolah</th>
          <th>Purata</th>
          <th>Gred</th>
          <th>Diserahkan</th>
          <th>UID</th>
        </tr>
      </thead>
      <tbody>
        ${bodyRows}
      </tbody>
    </table>
  `;
}

function toCsvValue(value) {
  const str = value == null ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildCsv(submissions) {
  const rows = [
    ["Nama Guru", "Penilai", "Tarikh", "Sekolah", "Purata", "Gred", "Diserahkan", "UID"],
  ];
  buildRows(submissions).forEach((row) => {
    rows.push([
      row.teacher,
      row.evaluator,
      row.date,
      row.school,
      row.average,
      row.grade,
      row.createdAt,
      row.createdBy,
    ]);
  });
  return rows.map((row) => row.map(toCsvValue).join(",")).join("\r\n");
}

function downloadBlob(contents, fileName, mimeType) {
  const blob = new Blob([contents], { type: mimeType });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

async function loadSubmissions({ uid, role }) {
  const submissionsRef = collection(db, "submissions");
  let submissionsQuery = query(submissionsRef, orderBy("createdAt", "desc"));
  if (role === "user") {
    submissionsQuery = query(submissionsRef, where("createdBy", "==", uid), orderBy("createdAt", "desc"));
  }
  const snapshot = await getDocs(submissionsQuery);
  cachedSubmissions = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  renderTable(cachedSubmissions);
}

function updateRoleUI(role) {
  if (dashboardRole) {
    dashboardRole.textContent = `Peranan: ${role}`;
  }
  if (btnExport) {
    btnExport.style.display = role === "admin" ? "inline-flex" : "none";
  }
  if (btnNewSubmission) {
    btnNewSubmission.style.display = role === "viewer" ? "none" : "inline-flex";
  }
}

async function init() {
  const { user, role } = await requireAuth();
  updateRoleUI(role);
  await loadSubmissions({ uid: user.uid, role });

  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const csv = buildCsv(cachedSubmissions);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      downloadBlob(csv, `tpa-submissions-${timestamp}.csv`, "text/csv;charset=utf-8");
    });
  }

  if (btnNewSubmission) {
    btnNewSubmission.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      await signOutUser();
      window.location.href = "./login.html";
    });
  }
}

init();
