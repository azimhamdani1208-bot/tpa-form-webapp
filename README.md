# tpa-form-webapp (Firebase Refactor)

Teacher Performance Appraisal web app using **Firebase Authentication**, **Firestore**, and **Firebase Hosting** only.

## Updated folder structure

```text
.
├── index.html          # Landing page with role-based module cards
├── login.html          # Email/password login
├── teachers.html       # Teacher details CRUD
├── tpa-form.html       # Observation submission form
├── summary.html        # Observation history + computed summaries
├── dashboard.html      # Chart.js dashboard
├── firebase.js         # Central Firebase initialization + exports
├── auth.js             # Auth guard + role/profile helpers
├── nav.js              # Role-based top navigation
├── index.js
├── login.js
├── teachers.js
├── tpa-form.js
├── summary.js
├── dashboard.js
├── styles.css
├── firestore.rules
└── firebase.json
```

## Firebase architecture

- Authentication: Email/Password sign-in (`login.html`).
- Firestore collections:
  - `users/{uid}`: `name`, `email`, `role`, `school`
  - `teachers/{teacherId}`: `name`, `email`, `school`, `department`, `subject`, `createdAt`
  - `observations/{observationId}`: `teacherId`, `observerId`, `school`, `date`, `scores`, `remarks`, `createdAt`
- Hosting: deploy to Firebase Hosting (works for static pages and Firebase SDK runtime).

## Login authentication flow

1. User signs in with email/password on `login.html`.
2. App reads profile from `users/{uid}`.
3. Role is resolved (`admin`, `observer`, `viewer`).
4. User is redirected to `dashboard.html`.
5. Each page uses `requireAuth` to enforce role access.

## Firestore write functions

- Teacher write (`teachers.js`)
  - `addDoc(collection(db, "teachers"), { ...payload, createdAt: serverTimestamp() })`
  - `updateDoc(doc(db, "teachers", id), payload)`
- Observation write (`tpa-form.js`)
  - `addDoc(collection(db, "observations"), { teacherId, observerId, school, date, scores, remarks, createdAt: serverTimestamp() })`

## Example dashboard query

`dashboard.js` fetches raw `teachers` and `observations` docs with `getDocs`, then computes:

- average score per teacher
- average score per school
- total observations
- completion status = teachers observed / total teachers

Charts are rendered with Chart.js.

## Deploy (Firebase Hosting)

1. Install CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Select project: `firebase use <project-id>`
4. Deploy rules + hosting: `firebase deploy`

## GitHub Pages note

Firebase Auth and Firestore can work from GitHub Pages if the authorized domain is added in Firebase Authentication settings.
For the requested architecture and security rules deployment, Firebase Hosting is the primary target.
