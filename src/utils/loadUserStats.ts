import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';

/**
 * Load saved stat data for a given category
 * @param user Firebase authenticated user
 * @param category e.g. "strength", "endurance"
 */
export async function loadUserStats<T>(
  user: User,
  category: string
): Promise<T | null> {
  if (!user) throw new Error('User not authenticated');
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  return (data[category] as T) || null;
}
