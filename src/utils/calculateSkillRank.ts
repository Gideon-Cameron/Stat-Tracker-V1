import { skillRankThresholds, SkillTest, } from '../data/skillRankThresholds';
import { Rank } from '../types/Rank'

export function calculateSkillRank(test: SkillTest, value: string): Rank {
  const thresholds = skillRankThresholds[test];

  if (!thresholds) {
    throw new Error(`Unknown skill test: ${test}`);
  }

  const rank = thresholds[value];

  if (!rank) {
    throw new Error(`Unknown skill level "${value}" for test "${test}"`);
  }

  return rank;
}
