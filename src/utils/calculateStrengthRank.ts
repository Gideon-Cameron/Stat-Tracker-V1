import { strengthRankThresholds, StrengthTest, } from '../data/strengthRankThresholds';
import { Rank } from '../types/Rank'

export function calculateStrengthRank(test: StrengthTest, value: number): Rank {
  const thresholds = strengthRankThresholds[test];

  let matchedRank: Rank = 'E';

  for (const threshold of thresholds) {
    if (value >= threshold.min) {
      matchedRank = threshold.rank;
    } else {
      break;
    }
  }

  return matchedRank;
}
 