import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB2wmiqHRTTqU4aHodRoLJ9OBnJaNRMgL0",
  authDomain: "proof-of-cringe-72a1a.firebaseapp.com",
  databaseURL: "https://proof-of-cringe-72a1a-default-rtdb.firebaseio.com",
  projectId: "proof-of-cringe-72a1a",
  storageBucket: "proof-of-cringe-72a1a.firebasestorage.app",
  messagingSenderId: "576220861794",
  appId: "1:576220861794:web:bce3a2464580a5342e083b",
  measurementId: "G-DT8BHG4PL3"
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