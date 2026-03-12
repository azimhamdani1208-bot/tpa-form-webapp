import { collection, db, getDocs } from "./firebase.js";
import { requireAuth } from "./auth.js";
import { renderTopNav } from "./nav.js";

const summaryStatus = document.getElementById("summaryStatus");
const historyRows = document.getElementById("historyRows");
const teacherSummaryRows = document.getElementById("teacherSummaryRows");
const schoolSummaryRows = document.getElementById("schoolSummaryRows");

function setStatus(message, type = "") {
  summaryStatus.className = `status ${type}`;
  summaryStatus.textContent = message;
}

function scoreAverage(scores) {
  const values = Object.values(scores || {});
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length;
}

function aggregateBy(items, keyGetter) {
  const map = new Map();
  items.forEach((item) => {
    const key = keyGetter(item);
    const existing = map.get(key) || { total: 0, count: 0 };
    existing.total += item.average;
    existing.count += 1;
    map.set(key, existing);
  });
  return map;
}

async function init() {
  setStatus("Loading summaries...");
  const { role, profile } = await requireAuth({ allowRoles: ["admin", "observer", "viewer"] });
  renderTopNav({ role, profile, current: "summary" });

  const [teachersSnap, observationsSnap] = await Promise.all([
    getDocs(collection(db, "teachers")),
    getDocs(collection(db, "observations")),
  ]);

  const teachers = new Map();
  teachersSnap.forEach((doc) => teachers.set(doc.id, doc.data()));

  const items = [];
  observationsSnap.forEach((doc) => {
    const obs = doc.data();
    items.push({
      id: doc.id,
      ...obs,
      teacherName: teachers.get(obs.teacherId)?.name || obs.teacherId,
      average: scoreAverage(obs.scores),
    });
  });

  historyRows.innerHTML = items
    .map(
      (item) => `<tr><td>${item.date || "-"}</td><td>${item.teacherName}</td><td>${item.school || "-"}</td><td>${item.observerId}</td><td>${item.average.toFixed(2)}</td><td>${item.remarks || ""}</td></tr>`,
    )
    .join("");

  const byTeacher = aggregateBy(items, (item) => item.teacherName);
  teacherSummaryRows.innerHTML = Array.from(byTeacher.entries())
    .map(([teacherName, stats]) => `<tr><td>${teacherName}</td><td>${(stats.total / stats.count).toFixed(2)}</td><td>${stats.count}</td></tr>`)
    .join("");

  const bySchool = aggregateBy(items, (item) => item.school || "Unknown");
  schoolSummaryRows.innerHTML = Array.from(bySchool.entries())
    .map(([schoolName, stats]) => `<tr><td>${schoolName}</td><td>${(stats.total / stats.count).toFixed(2)}</td><td>${stats.count}</td></tr>`)
    .join("");

  setStatus(`Loaded ${items.length} observations.`, "success");
}

init().catch((error) => {
  console.error("[summary] Failed to load", error);
  setStatus("Unable to load summary.", "error");
});
