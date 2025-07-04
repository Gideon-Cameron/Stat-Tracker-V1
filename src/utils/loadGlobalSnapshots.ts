import { db } from '../lib/firebase';
import {
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { GlobalSnapshot } from '../types/GlobalSnapshot';

/**
 * Loads all global snapshots for a given user.
 * Returns them ordered by timestamp (latest first).
 */
export const loadGlobalSnapshots = async (
  user: User
): Promise<GlobalSnapshot[]> => {
  if (!user || !user.uid) throw new Error('User is not authenticated.');

  const snapshotQuery = query(
    collection(db, 'users', user.uid, 'globalSnapshots'),
    orderBy('timestamp', 'desc')
  );

  const snapshotDocs = await getDocs(snapshotQuery);

  return snapshotDocs.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<GlobalSnapshot, 'id'>),
  }));
};
