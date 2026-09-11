/**
 * Firebase Firestore Service for School End-of-Year Report System
 * Saves and loads all report data strictly categorized by each section.
 */
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';
import { EndOfYearReport } from '../types';

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC5T2ec-mxeO0lzknVe5SEBBXlp7IWmmuE",
  authDomain: "schoolreport-a7404.firebaseapp.com",
  databaseURL: "https://schoolreport-a7404-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "schoolreport-a7404",
  storageBucket: "schoolreport-a7404.firebasestorage.app",
  messagingSenderId: "62869703269",
  appId: "1:62869703269:web:d1a763f78eb8ae8906d48c",
};

export const DEFAULT_REPORT_DOC_ID = 'end_year_2026';

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

export const getFirebaseApp = (customConfig?: Record<string, string>): FirebaseApp => {
  if (customConfig) {
    return initializeApp(customConfig, 'custom-app-' + Date.now());
  }
  if (!getApps().length) {
    const savedConfigStr = localStorage.getItem('custom_firebase_config');
    const config = savedConfigStr ? JSON.parse(savedConfigStr) : DEFAULT_FIREBASE_CONFIG;
    appInstance = initializeApp(config);
  } else {
    appInstance = getApp();
  }
  return appInstance;
};

export const getFirestoreDb = (): Firestore => {
  if (!dbInstance) {
    const app = getFirebaseApp();
    dbInstance = getFirestore(app);
  }
  return dbInstance;
};

/**
 * Save complete report to Firestore, structured cleanly by section
 */
export const saveReportToFirestore = async (
  reportDocId: string,
  reportData: Partial<EndOfYearReport>
): Promise<{ success: boolean; message: string; docId: string }> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, 'reports', reportDocId);

    const payload = {
      ...reportData,
      metadata: {
        ...(reportData.metadata || {}),
        type: 'end_of_year_report',
        academicYear: '២០២៥-២០២៦',
        titleKhmer: 'របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ ផ្នែកបឋមសិក្សា (នាដំណាច់ឆ្នាំ ឆ្នាំសិក្សា២០២៥-២០២៦)',
        lastUpdated: new Date().toISOString(),
        savedAtMillis: Date.now(),
        version: 2,
      },
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, payload, { merge: true });

    return {
      success: true,
      message: `បានរក្សាទុកក្នុង Firestore [reports/${reportDocId}] ដោយជោគជ័យតាមផ្នែកនីមួយៗ!`,
      docId: reportDocId,
    };
  } catch (err: any) {
    console.error('Firestore save error:', err);
    throw new Error(err.message || 'Failed to save to Firestore');
  }
};

/**
 * Load report from Firestore by document ID
 */
export const loadReportFromFirestore = async (
  reportDocId: string
): Promise<Partial<EndOfYearReport> | null> => {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, 'reports', reportDocId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Partial<EndOfYearReport>;
    }
    return null;
  } catch (err: any) {
    console.error('Firestore load error:', err);
    throw new Error(err.message || 'Failed to load from Firestore');
  }
};

/**
 * List all available reports from Firestore
 */
export const listFirestoreReports = async (): Promise<Array<{ id: string; title?: string; lastUpdated?: string }>> => {
  try {
    const db = getFirestoreDb();
    const reportsCol = collection(db, 'reports');
    const snapshot = await getDocs(reportsCol);
    return snapshot.docs.map((d) => ({
      id: d.id,
      title: d.data()?.metadata?.titleKhmer || d.data()?.title || d.id,
      lastUpdated: d.data()?.metadata?.lastUpdated || d.data()?.updatedAt || '',
    }));
  } catch (err) {
    console.warn('Could not list reports:', err);
    return [{ id: DEFAULT_REPORT_DOC_ID, title: 'របាយការណ៍ដំណាច់ឆ្នាំ ២០២៥-២០២៦' }];
  }
};
