import { Rank } from '../types/Rank';

export type SpeedTest =
  | 'sprint100m'
  | 'run1km'
  | 'suicides20m'
  | 'rulerDrop'
  | 'reactionTime';


type Threshold = { min: number; rank: Rank };

type SpeedRankThresholds = Record<SpeedTest, Threshold[]>;

export const speedRankThresholds: SpeedRankThresholds = {
  sprint100m: [
    { min: 0, rank: 'Mythic' },        // under 10.5
    { min: 10.5, rank: 'SS' },
    { min: 11.5, rank: 'S' },
    { min: 12.5, rank: 'A' },
    { min: 14.0, rank: 'B' },
    { min: 15.5, rank: 'C' },
    { min: 17.0, rank: 'D' },
    { min: 18.0, rank: 'E' },
  ],

  run1km: [
    { min: 0, rank: 'Mythic' },        // under 180 sec
    { min: 180, rank: 'SS' },
    { min: 210, rank: 'S' },
    { min: 240, rank: 'A' },
    { min: 270, rank: 'B' },
    { min: 300, rank: 'C' },
    { min: 330, rank: 'D' },
    { min: 360, rank: 'E' },
  ],

  suicides20m: [
    { min: 0, rank: 'Mythic' },        // under 17.5 sec
    { min: 17.5, rank: 'SS' },
    { min: 20.0, rank: 'S' },
    { min: 23.0, rank: 'A' },
    { min: 26.0, rank: 'B' },
    { min: 30.0, rank: 'C' },
    { min: 35.0, rank: 'D' },
    { min: 40.0, rank: 'E' },
  ],

  rulerDrop: [
    { min: 0, rank: 'Mythic' },        // 0–2 cm
    { min: 3, rank: 'SS' },
    { min: 6, rank: 'S' },
    { min: 11, rank: 'A' },
    { min: 21, rank: 'B' },
    { min: 31, rank: 'C' },
    { min: 41, rank: 'D' },
    { min: 51, rank: 'E' },
  ],

  reactionTime: [
    { min: 0, rank: 'Mythic' },        // <130ms
    { min: 130, rank: 'SS' },
    { min: 150, rank: 'S' },
    { min: 180, rank: 'A' },
    { min: 210, rank: 'B' },
    { min: 240, rank: 'C' },
    { min: 270, rank: 'D' },
    { min: 300, rank: 'E' },
  ],
};
