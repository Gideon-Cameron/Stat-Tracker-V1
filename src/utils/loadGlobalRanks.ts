import { getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';
import { GlobalStatSummary, StatCategory } from '../types/StatCategory';
import { Rank } from '../types/Rank'; // centralized Rank type

const statCategories: StatCategory[] = [
  'strength',
  'endurance',
  'speed',
  'skill',
  'flexibility',
];

export async function loadGlobalRanks(user: User): Promise<GlobalStatSummary[]> {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    console.warn('[loadGlobalRanks] User doc not found');
    return statCategories.map((category) => ({
      category,
      globalRank: 'E',
    }));
  }

  const userData = snapshot.data();

  return statCategories.map((category) => {
    const statEntry = userData?.[category];
    const rank = statEntry?.globalRank as Rank;
    console.log(`[loadGlobalRanks] ${category} →`, rank || 'E');

    return {
      category,
      globalRank: rank || 'E',
    };
  });
}
