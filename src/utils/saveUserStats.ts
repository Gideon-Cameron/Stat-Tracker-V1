import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
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
 * Normalize an object: stringifies all values (except timestamp) for safe comparison
 */
function normalize(obj: Record<string, any>) {
  const {...rest } = obj;
  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(rest)) {
    normalized[key] = String(value);
  }
  return normalized;
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
  console.log(`[📝 Stats Saved] ${category}`);

  // 2. Load all history snapshots
  const historyRef = collection(db, 'users', user.uid, 'stats', category, 'history');
  const fullSnapshot = await getDocs(query(historyRef, orderBy('timestamp', 'desc')));
  console.log(`[📜 Snapshot History] Count: ${fullSnapshot.size}`);

  // ✅ If no snapshots exist, save one immediately
  if (fullSnapshot.empty) {
    await addDoc(historyRef, {
      ...data,
      timestamp: now,
    });
    console.log(`[✅ First Snapshot Auto-Saved] ${category} at ${new Date(now).toISOString()}`);
    return;
  }

  // 3. Compare with most recent snapshot
  const latest = fullSnapshot.docs[0]?.data() as SnapshotData | undefined;
  const latestTimestamp = latest?.timestamp ?? 0;
  const timeSinceLast = now - latestTimestamp;
  const isTooSoon = timeSinceLast < oneWeek;

  const isSameContent =
    latest && JSON.stringify(normalize(latest)) === JSON.stringify(normalize(data));

  const shouldSaveSnapshot = !latest || (!isTooSoon && !isSameContent);

  console.log('[🧠 Snapshot Check]', {
    normalizedCurrent: normalize(data),
    normalizedLatest: latest ? normalize(latest) : null,
    isTooSoon,
    isSameContent,
    shouldSaveSnapshot,
    timeSinceLast: `${Math.floor(timeSinceLast / (1000 * 60 * 60 * 24))} days`,
  });

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
