# tpa-form-webapp
Online TPA evaluation form

## Firebase Setup
- Create a Firebase project and enable **Email/Password** authentication.
- Create a Firestore database in production mode.
- In Firestore, create user documents under `users/{uid}` with a `role` field set to `admin`, `user`, or `viewer`.
- Update `firebase.js` with your project configuration values.

### Admin user creation
1. Use the Firebase Console to add users with Email/Password.
2. For each user, create a matching `users/{uid}` document in Firestore with the desired `role`.
   - Example: `{ "role": "admin" }`

### Deploy
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init` (select Hosting + Firestore, use existing project)
4. Deploy: `firebase deploy`
