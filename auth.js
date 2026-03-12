import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "./firebase.js";

const DEFAULT_ROLE = "viewer";

export async function signInUser(email, password) {
  console.log("[auth] Signing in", email);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  console.log("[auth] Signing out");
  return signOut(auth);
}

export async function getUserProfile(uid) {
  const profileRef = doc(db, "users", uid);
  const profileSnap = await getDoc(profileRef);
  if (!profileSnap.exists()) {
    console.warn("[auth] Missing user profile for uid", uid);
    return { role: DEFAULT_ROLE };
  }
  return profileSnap.data();
}

export async function getUserRole(uid) {
  const profile = await getUserProfile(uid);
  return profile.role || DEFAULT_ROLE;
}

export function requireAuth({ allowRoles, redirectTo = "./login.html" } = {}) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = redirectTo;
        return;
      }

      const profile = await getUserProfile(user.uid);
      const role = profile.role || DEFAULT_ROLE;
      if (allowRoles?.length && !allowRoles.includes(role)) {
        console.warn("[auth] Unauthorized role", role, "for page", window.location.pathname);
        window.location.href = "./dashboard.html";
        return;
      }

      resolve({ user, profile, role });
    });
  });
}
