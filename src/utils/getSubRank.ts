import { Rank } from '../types/Rank';
import { strengthRankThresholds, StrengthTest } from '../data/strengthRankThresholds';

export type SubRank = `${Rank}` | `${Rank}-` | `${Rank}+`;

interface SubRankResult {
  mainRank: Rank;
  subRank: SubRank;
  progressToNext: number; // 0 to 1, showing how close to next rank
}

export function getSubRank(
  testName: StrengthTest,
  value: number
): SubRankResult {
  const thresholds = strengthRankThresholds[testName];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i].min) {
      const current = thresholds[i];
      const next = thresholds[i + 1];

      // No next rank = top rank
      if (!next) {
        return {
          mainRank: current.rank,
          subRank: current.rank,
          progressToNext: 1,
        };
      }

      const span = next.min - current.min;
      const offset = value - current.min;
      const percent = span > 0 ? offset / span : 0;

      let subRank: SubRank = current.rank;

      if (percent < 0.33) subRank = `${current.rank}-` as SubRank;
      else if (percent < 0.66) subRank = current.rank;
      else subRank = `${current.rank}+` as SubRank;

      return {
        mainRank: current.rank,
        subRank,
        progressToNext: Math.min(1, Math.max(0, percent)),
      };
    }
  }

  // If below all thresholds
  const lowest = thresholds[0];
  return {
    mainRank: lowest.rank,
    subRank: `${lowest.rank}-` as SubRank,
    progressToNext: 0,
  };
}
