// types/GlobalSnapshot.ts

import { Rank } from './Rank';
import { StatCategory } from './StatCategory';

/**
 * A global snapshot that captures the user's average score,
 * global rank, and rank per category at a point in time.
 */
export type GlobalSnapshot = {
  id?: string; // Will be included when fetched from Firestore
  timestamp: number;
  rankMap: Record<StatCategory, Rank>; // e.g. { strength: "B", endurance: "A", ... }
  averageScore: number;                // Average score across categories
  globalRank: Rank;                    // Final overall global rank
};
