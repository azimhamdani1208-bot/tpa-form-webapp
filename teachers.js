import {
  addDoc,
  collection,
  db,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "./firebase.js";
import { requireAuth } from "./auth.js";
import { renderTopNav } from "./nav.js";

const form = document.getElementById("teacherForm");
const rows = document.getElementById("teacherRows");
const status = document.getElementById("teacherStatus");

function teacherPayload() {
  return {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    school: document.getElementById("school").value.trim(),
    department: document.getElementById("department").value.trim(),
    subject: document.getElementById("subject").value.trim(),
  };
}

function setStatus(message, type = "") {
  status.className = `status ${type}`;
  status.textContent = message;
}

async function loadTeachers() {
  const teachersRef = collection(db, "teachers");
  const teachersQuery = query(teachersRef, orderBy("name"));
  const snapshot = await getDocs(teachersQuery);
  rows.innerHTML = "";

  snapshot.forEach((entry) => {
    const teacher = entry.data();
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${teacher.name}</td><td>${teacher.email || "-"}</td><td>${teacher.school}</td><td>${teacher.department}</td><td>${teacher.subject}</td><td><button class="btn secondary" data-id="${entry.id}">Edit</button></td>`;
    tr.querySelector("button")?.addEventListener("click", () => {
      document.getElementById("teacherId").value = entry.id;
      document.getElementById("name").value = teacher.name || "";
      document.getElementById("email").value = teacher.email || "";
      document.getElementById("school").value = teacher.school || "";
      document.getElementById("department").value = teacher.department || "";
      document.getElementById("subject").value = teacher.subject || "";
      setStatus(`Editing ${teacher.name}`);
    });
    rows.appendChild(tr);
  });
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("Saving teacher...");

  const id = document.getElementById("teacherId").value;
  const payload = teacherPayload();

  try {
    if (id) {
      await updateDoc(doc(db, "teachers", id), payload);
      console.log("[teachers] Updated teacher", id);
    } else {
      await addDoc(collection(db, "teachers"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      console.log("[teachers] Created teacher");
    }

    form.reset();
    document.getElementById("teacherId").value = "";
    setStatus("Teacher saved.", "success");
    await loadTeachers();
  } catch (error) {
    console.error("[teachers] Save failed", error);
    setStatus("Unable to save teacher.", "error");
  }
});

document.getElementById("resetTeacher")?.addEventListener("click", () => {
  form.reset();
  document.getElementById("teacherId").value = "";
  setStatus("Form reset.");
});

async function init() {
  setStatus("Loading teachers...");
  const { role, profile } = await requireAuth({ allowRoles: ["admin", "observer"] });
  renderTopNav({ role, profile, current: "teachers" });
  await loadTeachers();
  setStatus("");
}

init();
