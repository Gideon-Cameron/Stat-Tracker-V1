import { Rank } from '../types/Rank';

const rankToScoreMap: Record<Rank, number> = {
  E: 1,
  D: 2,
  C: 3,
  B: 4,
  A: 5,
  S: 6,
  SS: 7,
  Mythic: 8,
};

const scoreToRankMap: Record<number, Rank> = {
  1: 'E',
  2: 'D',
  3: 'C',
  4: 'B',
  5: 'A',
  6: 'S',
  7: 'SS',
  8: 'Mythic',
};

/**
 * Generic rank average calculator for any stat category
 */
export function calculateAverageRank(ranks: Rank[]): { averageScore: number; globalRank: Rank } {
  if (ranks.length === 0) return { averageScore: 0, globalRank: 'E' };

  const total = ranks.reduce((sum, rank) => sum + rankToScoreMap[rank], 0);
  const avg = total / ranks.length;
  const rounded = Math.round(avg);

  return {
    averageScore: Number(avg.toFixed(2)),
    globalRank: scoreToRankMap[rounded] || 'E',
  };
}
