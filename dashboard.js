import { collection, db, getDocs } from "./firebase.js";
import { requireAuth } from "./auth.js";
import { renderTopNav } from "./nav.js";

const dashboardStatus = document.getElementById("dashboardStatus");

function setStatus(message, type = "") {
  dashboardStatus.className = `status ${type}`;
  dashboardStatus.textContent = message;
}

function average(scores) {
  const values = Object.values(scores || {});
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length;
}

function aggregate(items, key) {
  const grouped = {};
  items.forEach((item) => {
    const group = item[key] || "Unknown";
    if (!grouped[group]) grouped[group] = { total: 0, count: 0 };
    grouped[group].total += item.avg;
    grouped[group].count += 1;
  });
  return grouped;
}

function createChart(canvasId, label, grouped) {
  const labels = Object.keys(grouped);
  const data = labels.map((entry) => grouped[entry].total / grouped[entry].count);
  const ctx = document.getElementById(canvasId);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 1,
      }],
    },
    options: {
      scales: { y: { beginAtZero: true, suggestedMax: 5 } },
    },
  });
}

// Example dashboard query with raw observation data aggregation.
async function fetchDashboardMetrics() {
  const [teachersSnap, observationsSnap] = await Promise.all([
    getDocs(collection(db, "teachers")),
    getDocs(collection(db, "observations")),
  ]);

  const teacherMap = new Map();
  teachersSnap.forEach((entry) => teacherMap.set(entry.id, entry.data()));

  const observations = [];
  observationsSnap.forEach((entry) => {
    const value = entry.data();
    observations.push({
      ...value,
      teacherName: teacherMap.get(value.teacherId)?.name || value.teacherId,
      avg: average(value.scores),
    });
  });

  return {
    observations,
    totalTeachers: teachersSnap.size,
  };
}

async function init() {
  setStatus("Loading dashboard...");
  const { role, profile } = await requireAuth({ allowRoles: ["admin", "observer", "viewer"] });
  renderTopNav({ role, profile, current: "dashboard" });

  const { observations, totalTeachers } = await fetchDashboardMetrics();
  const teacherAgg = aggregate(observations, "teacherName");
  const schoolAgg = aggregate(observations, "school");

  document.getElementById("totalObservations").textContent = String(observations.length);
  document.getElementById("teachersObserved").textContent = String(Object.keys(teacherAgg).length);
  const completion = totalTeachers ? (Object.keys(teacherAgg).length / totalTeachers) * 100 : 0;
  document.getElementById("completionStatus").textContent = `${completion.toFixed(1)}%`;

  createChart("teacherChart", "Average Score", teacherAgg);
  createChart("schoolChart", "Average Score", schoolAgg);
  setStatus("Dashboard loaded.", "success");
}

init().catch((error) => {
  console.error("[dashboard] Failed to load", error);
  setStatus("Unable to load dashboard.", "error");
});
