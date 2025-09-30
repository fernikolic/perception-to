#!/usr/bin/env node
/**
 * Save Conference Data to Firestore
 *
 * Stores conference data snapshots in Firestore for historical tracking
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyBhfpFHV1zBsC6O6m12UqqxnQ0QMeo0z9c",
  authDomain: "perception-marketing-site.firebaseapp.com",
  projectId: "perception-marketing-site",
  storageBucket: "perception-marketing-site.firebasestorage.app",
  messagingSenderId: "128328954007",
  appId: "1:128328954007:web:adfe5470f1e187d165b9d2",
  measurementId: "G-N636BYJDMX"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);

async function saveConferencesToFirestore() {
  try {
    console.log('📦 Reading conference data from file...');

    // Read the conferences.ts file
    const conferencesPath = path.join(__dirname, '..', 'src', 'data', 'conferences.ts');
    const fileContent = fs.readFileSync(conferencesPath, 'utf8');

    // Extract the JSON array from the TypeScript file
    const jsonMatch = fileContent.match(/export const allConferences: Conference\[\] = (\[[\s\S]*?\]);/);
    if (!jsonMatch) {
      console.error('❌ Could not extract conference data from file');
      return;
    }

    const conferences = JSON.parse(jsonMatch[1]);
    console.log(`✅ Found ${conferences.length} conferences in file`);

    // Extract the last updated timestamp from the file
    const timestampMatch = fileContent.match(/Last updated: (.+)/);
    const lastUpdated = timestampMatch ? timestampMatch[1] : new Date().toISOString();

    // Extract the source from the file
    const sourceMatch = fileContent.match(/Source: (.+)/);
    const source = sourceMatch ? sourceMatch[1] : 'Unknown';

    // Create a snapshot document
    const snapshot = {
      conferences: conferences,
      count: conferences.length,
      fetchedAt: Timestamp.fromDate(new Date(lastUpdated)),
      source: source,
      createdAt: Timestamp.now()
    };

    // Save to two locations:
    // 1. Add to historical snapshots collection
    const snapshotsRef = collection(firestore, 'conference-snapshots');
    const docRef = await addDoc(snapshotsRef, snapshot);
    console.log(`✅ Saved snapshot to Firestore with ID: ${docRef.id}`);

    // 2. Update the "latest" document for easy querying
    const latestRef = doc(firestore, 'conference-data', 'latest');
    await setDoc(latestRef, snapshot);
    console.log('✅ Updated latest conference data in Firestore');

    // Log summary
    console.log('\n📊 Summary:');
    console.log(`   Conferences: ${conferences.length}`);
    console.log(`   Source: ${source}`);
    console.log(`   Fetched: ${new Date(lastUpdated).toLocaleString()}`);
    console.log(`   Snapshot ID: ${docRef.id}`);

  } catch (error) {
    console.error('❌ Error saving to Firestore:', error);
    process.exit(1);
  }
}

// Run the script
saveConferencesToFirestore()
  .then(() => {
    console.log('\n🎉 Successfully saved conference data to Firestore!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });