// types/GlobalSnapshot.ts

import { Rank } from './Rank';
import { StatCategory } from './StatCategory';

/**
 * A minimal snapshot of the user's current stat performance.
 * Used for plotting and tracking weekly progression.
 */
export type GlobalSnapshot = {
  id?: string; // Assigned by Firestore when loaded
  timestamp: number; // When this snapshot was saved
  rankMap: Record<StatCategory, Rank>; // e.g., { strength: 'A', skill: 'S', ... }
  averageScore: number; // Calculated average from ranks
  globalRank: Rank; // Final global rating based on average
};
