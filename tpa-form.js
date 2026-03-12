import {
  addDoc,
  collection,
  db,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "./firebase.js";
import { requireAuth } from "./auth.js";
import { renderTopNav } from "./nav.js";

const teacherSelect = document.getElementById("teacherId");
const form = document.getElementById("observationForm");
const status = document.getElementById("observationStatus");

function setStatus(message, type = "") {
  status.className = `status ${type}`;
  status.textContent = message;
}

async function loadTeachers() {
  teacherSelect.innerHTML = "<option value=''>Select teacher</option>";
  const snapshot = await getDocs(query(collection(db, "teachers"), orderBy("name")));
  snapshot.forEach((item) => {
    const data = item.data();
    teacherSelect.innerHTML += `<option value="${item.id}" data-school="${data.school}">${data.name} (${data.school})</option>`;
  });
}

teacherSelect?.addEventListener("change", (event) => {
  const option = event.target.selectedOptions[0];
  document.getElementById("school").value = option?.dataset.school || "";
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const scores = {
    planning: Number(document.getElementById("planning").value),
    delivery: Number(document.getElementById("delivery").value),
    management: Number(document.getElementById("management").value),
  };

  setStatus("Submitting observation...");

  try {
    const { user } = await requireAuth({ allowRoles: ["admin", "observer"] });
    await addDoc(collection(db, "observations"), {
      teacherId: teacherSelect.value,
      observerId: user.uid,
      school: document.getElementById("school").value.trim(),
      date: document.getElementById("date").value,
      scores,
      remarks: document.getElementById("remarks").value.trim(),
      createdAt: serverTimestamp(),
    });
    console.log("[observation] Submitted", { teacherId: teacherSelect.value, observerId: user.uid });
    form.reset();
    setStatus("Observation submitted successfully.", "success");
  } catch (error) {
    console.error("[observation] Submission failed", error);
    setStatus("Failed to submit observation.", "error");
  }
});

async function init() {
  setStatus("Loading form...");
  const { role, profile } = await requireAuth({ allowRoles: ["admin", "observer"] });
  renderTopNav({ role, profile, current: "tpa-form" });
  await loadTeachers();
  setStatus("");
}

init();
