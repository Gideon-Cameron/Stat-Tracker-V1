import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { GlobalSnapshot } from '../types/GlobalSnapshot';

/**
 * Saves a global snapshot (strength + endurance + flexibility + overall average)
 * for the current user under the 'globalSnapshots' subcollection.
 */
export const saveGlobalSnapshot = async (
  user: User,
  snapshot: Omit<GlobalSnapshot, 'id'>
): Promise<void> => {
  if (!user || !user.uid) throw new Error('User is not authenticated.');

  const snapshotRef = collection(db, 'users', user.uid, 'globalSnapshots');

  await addDoc(snapshotRef, {
    ...snapshot,
    timestamp: snapshot.timestamp || Date.now(),
  });
};
