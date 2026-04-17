import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

let appInitialized = false;

function initializeFirebaseAdmin() {
  if (appInitialized) return;

  if (admin.apps.length > 0) {
    appInitialized = true;
    return;
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccountJson) {
    const credentials = JSON.parse(serviceAccountJson);
    admin.initializeApp({
      credential: admin.credential.cert(credentials),
    });
    appInitialized = true;
    return;
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    appInitialized = true;
    return;
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    appInitialized = true;
    return;
  }

  throw new Error(
    "Firebase Admin 자격 증명이 없습니다. FIREBASE_SERVICE_ACCOUNT_JSON, GOOGLE_APPLICATION_CREDENTIALS, 또는 FIREBASE_ADMIN_PROJECT_ID + FIREBASE_ADMIN_CLIENT_EMAIL + FIREBASE_ADMIN_PRIVATE_KEY 환경 변수를 설정하세요."
  );
}

export function getFirebaseAdminApp() {
  initializeFirebaseAdmin();
  return admin.app();
}

export function getAdminFirestore() {
  getFirebaseAdminApp();
  return getFirestore();
}