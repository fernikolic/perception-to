import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhfpFHV1zBsC6O6m12UqqxnQ0QMeo0z9c",
  authDomain: "perception-marketing-site.firebaseapp.com",
  projectId: "perception-marketing-site",
  storageBucket: "perception-marketing-site.firebasestorage.app",
  messagingSenderId: "128328954007",
  appId: "1:128328954007:web:adfe5470f1e187d165b9d2",
  measurementId: "G-N636BYJDMX"
};

// Initialize Firebase (reuse existing app if already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);

// Cache duration: 1 hour for 24h data, 6 hours for weekly/monthly
const getCacheDuration = (timePeriod: string) => {
  switch (timePeriod) {
    case '24h':
      return 60 * 60 * 1000; // 1 hour
    case 'weekly':
      return 6 * 60 * 60 * 1000; // 6 hours
    case 'monthly':
      return 12 * 60 * 60 * 1000; // 12 hours
    default:
      return 60 * 60 * 1000;
  }
};

export interface CachedData {
  data: any;
  timestamp: Timestamp;
  expiresAt: Timestamp;
}

export const getCachedData = async (cacheKey: string, timePeriod: string): Promise<any | null> => {
  try {
    const docRef = doc(firestore, 'twitter-sentiment-cache', cacheKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const cached = docSnap.data() as CachedData;
      const now = Timestamp.now();

      // Check if cache is still valid
      if (cached.expiresAt.toMillis() > now.toMillis()) {
        console.log(`Cache hit for key: ${cacheKey}`);
        return cached.data;
      }
      console.log(`Cache expired for key: ${cacheKey}`);
    }
    return null;
  } catch (error) {
    console.error('Error reading from Firestore cache:', error);
    return null;
  }
};

export const setCachedData = async (cacheKey: string, data: any, timePeriod: string): Promise<void> => {
  try {
    const now = Timestamp.now();
    const cacheDuration = getCacheDuration(timePeriod);
    const expiresAt = Timestamp.fromMillis(now.toMillis() + cacheDuration);

    const docRef = doc(firestore, 'twitter-sentiment-cache', cacheKey);
    await setDoc(docRef, {
      data,
      timestamp: now,
      expiresAt,
      timePeriod
    });

    console.log(`Cache set for key: ${cacheKey}, expires at: ${new Date(expiresAt.toMillis()).toISOString()}`);
  } catch (error) {
    console.error('Error writing to Firestore cache:', error);
  }
};