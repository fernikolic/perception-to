import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBhfpFHV1zBsC6O6m12UqqxnQ0QMeo0z9c",
  authDomain: "perception-marketing-site.firebaseapp.com",
  databaseURL: "https://perception-marketing-site-default-rtdb.firebaseio.com",
  projectId: "perception-marketing-site",
  storageBucket: "perception-marketing-site.firebasestorage.app",
  messagingSenderId: "128328954007",
  appId: "1:128328954007:web:adfe5470f1e187d165b9d2",
  measurementId: "G-N636BYJDMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
export { analytics };