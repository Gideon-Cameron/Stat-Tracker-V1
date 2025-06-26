import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';

interface SnapshotData {
  averageScore: number;
  globalRank: string;
  timestamp?: number;
  [key: string]: unknown;
}

/**
 * Saves the user's latest stat and conditionally saves a snapshot (once per week if changed).
 */
export async function saveUserStats<T extends Record<string, unknown>>(
  user: User,
  category: string,
  data: T & { averageScore: number; globalRank: string }
): Promise<void> {
  if (!user) throw new Error('[saveUserStats] User not authenticated');

  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  // 1. Save the stat to the user doc
  const ref = doc(db, 'users', user.uid);
  await setDoc(ref, { [category]: data }, { merge: true });

  // 2. Load latest snapshot from history
  const historyRef = collection(db, 'users', user.uid, 'stats', category, 'history');
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(1));
  const snapshot = await getDocs(q);

  const latest = snapshot.docs[0]?.data() as SnapshotData | undefined;
  const latestTimestamp = latest?.timestamp ?? 0;
  const timeSinceLast = now - latestTimestamp;

  const isTooSoon = timeSinceLast < oneWeek;
  const isSameContent =
    latest &&
    JSON.stringify({ ...latest, timestamp: undefined }) === JSON.stringify({ ...data });

  const shouldSaveSnapshot = !latest || (!isTooSoon && !isSameContent);

  if (shouldSaveSnapshot) {
    await addDoc(historyRef, {
      ...data,
      timestamp: now,
    });
    console.log(`[✅ Snapshot Saved] ${category} at ${new Date(now).toISOString()}`);
  } else {
    console.log(`[⏩ Snapshot Skipped]`, {
      reason: isTooSoon ? 'Too soon (< 1 week)' : 'No changes since last',
      timeSinceLast: `${Math.floor(timeSinceLast / (1000 * 60 * 60 * 24))} days`,
    });
  }
}
