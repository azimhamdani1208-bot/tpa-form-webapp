import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  db,
  doc,
  getDoc,
} from "./firebase.js";

const DEFAULT_ROLE = "viewer";

async function getUserRole(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    // Assumption: missing user profile defaults to viewer role.
    return DEFAULT_ROLE;
  }
  return snapshot.data().role || DEFAULT_ROLE;
}

function requireAuth({ allowRoles, redirectTo = "./login.html", unauthorizedRedirect = "./dashboard.html" } = {}) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.href = redirectTo;
        return;
      }
      const role = await getUserRole(user.uid);
      if (Array.isArray(allowRoles) && allowRoles.length > 0 && !allowRoles.includes(role)) {
        window.location.href = unauthorizedRedirect;
        return;
      }
      resolve({ user, role });
    });
  });
}

async function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

async function signOutUser() {
  return signOut(auth);
}

export { getUserRole, requireAuth, signInUser, signOutUser };
