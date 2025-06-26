import { speedRankThresholds, SpeedTest,} from '../data/speedRankThresholds';
import { Rank } from '../types/Rank'

/**
 * Calculates the rank for a given speed test based on the user's performance.
 * @param test - The specific speed test (e.g., sprint100m, reactionTime)
 * @param value - The user's result (time in seconds or ms, distance in cm)
 * @returns The appropriate global rank for the given result
 */
export function calculateSpeedRank(test: SpeedTest, value: number): Rank {
  const thresholds = speedRankThresholds[test];

  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (value >= thresholds[i].min) {
      return thresholds[i].rank;
    }
  }

  // Fallback (should never hit if thresholds cover all values);
  return 'E';
}
