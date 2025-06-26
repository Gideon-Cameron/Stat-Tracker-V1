import { Rank } from '../types/Rank';

// All supported stat categories
export type StatCategory =
  | 'strength'
  | 'endurance'
  | 'speed'
  | 'skill'
  | 'flexibility';

// Shape of a single category's global stat summary
export type GlobalStatSummary = {
  category: StatCategory;
  globalRank: Rank;
};
