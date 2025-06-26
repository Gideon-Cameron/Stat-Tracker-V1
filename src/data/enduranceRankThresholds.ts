import { Rank } from '../types/Rank';

export type EnduranceTest =
  | 'run1_5Mile'       // time (min)
  | 'plankHold'        // sec
  | 'pushUps'          // reps in 1 min
  | 'jumpRope'         // unbroken reps
  | 'wallSit'          // sec
  | 'runMaxDistance';  // km

type Threshold = { min: number; rank: Rank };

type RankThresholds = Record<EnduranceTest, Threshold[]>;

export const enduranceRankThresholds: RankThresholds = {
  run1_5Mile: [
    { min: 0, rank: 'Mythic' },   // placeholder to avoid empty list crash
    { min: 360, rank: 'Mythic' },  // ≤ 6:00
    { min: 361, rank: 'SS' },      // 6:01–7:00
    { min: 421, rank: 'S' },       // 7:01–8:30
    { min: 511, rank: 'A' },
    { min: 601, rank: 'B' },
    { min: 691, rank: 'C' },
    { min: 781, rank: 'D' },
    { min: 901, rank: 'E' },       // > 15:00
  ],

  plankHold: [
    { min: 0, rank: 'E' },
    { min: 30, rank: 'D' },
    { min: 61, rank: 'C' },
    { min: 91, rank: 'B' },
    { min: 121, rank: 'A' },
    { min: 161, rank: 'S' },
    { min: 201, rank: 'SS' },
    { min: 301, rank: 'Mythic' }, // > 5 min
  ],

  pushUps: [
    { min: 0, rank: 'E' },
    { min: 15, rank: 'D' },
    { min: 26, rank: 'C' },
    { min: 36, rank: 'B' },
    { min: 46, rank: 'A' },
    { min: 61, rank: 'S' },
    { min: 81, rank: 'SS' },
    { min: 101, rank: 'Mythic' },
  ],

  jumpRope: [
    { min: 0, rank: 'E' },
    { min: 20, rank: 'D' },
    { min: 41, rank: 'C' },
    { min: 71, rank: 'B' },
    { min: 101, rank: 'A' },
    { min: 151, rank: 'S' },
    { min: 301, rank: 'SS' },
    { min: 501, rank: 'Mythic' },
  ],

  wallSit: [
    { min: 0, rank: 'E' },
    { min: 30, rank: 'D' },
    { min: 61, rank: 'C' },
    { min: 91, rank: 'B' },
    { min: 121, rank: 'A' },
    { min: 151, rank: 'S' },
    { min: 181, rank: 'SS' },
    { min: 241, rank: 'Mythic' },
  ],

  runMaxDistance: [
    { min: 0, rank: 'E' },
    { min: 2, rank: 'D' },
    { min: 4, rank: 'C' },
    { min: 6, rank: 'B' },
    { min: 8, rank: 'A' },
    { min: 12, rank: 'S' },
    { min: 17, rank: 'SS' },
    { min: 22, rank: 'Mythic' },
  ],
};
