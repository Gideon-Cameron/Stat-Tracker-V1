import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  DocumentData,
  WithFieldValue,
} from 'firebase/firestore';

/**
 * Save a user's stat data to Firestore under a category like 'strength', 'endurance', etc.
 */
export async function saveUserStats<T extends Record<string, unknown>>(
  category: string,
  uid: string,
  data: T
): Promise<void> {
  const ref = doc(db, 'users', uid, 'stats', category);
  await setDoc(ref, data as WithFieldValue<DocumentData>);
}

/**
 * Retrieve a user's saved stats for a category (or return null if none)
 */
export async function getUserStats<T>(
  category: string,
  uid: string
): Promise<T | null> {
  const ref = doc(db, 'users', uid, 'stats', category);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data() as T;
  }

  return null;
}
