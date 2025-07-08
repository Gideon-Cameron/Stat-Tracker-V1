// src/data/rankRanges.ts

type RankLevel = 'F' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS';

export type RankThresholds = {
  [key in RankLevel]: number;
};

type RankRangeMap = {
  [testName: string]: RankThresholds;
};

// These are sample values — feel free to tune them to match real benchmarks.
export const rankRanges: RankRangeMap = {
  benchPress: {
    F: 0,
    D: 40,
    C: 60,
    B: 75,
    A: 90,
    S: 110,
    SS: 130,
  },
  squat: {
    F: 0,
    D: 50,
    C: 80,
    B: 100,
    A: 120,
    S: 140,
    SS: 160,
  },
  deadlift: {
    F: 0,
    D: 60,
    C: 90,
    B: 120,
    A: 150,
    S: 180,
    SS: 210,
  },
  overheadPress: {
    F: 0,
    D: 20,
    C: 35,
    B: 50,
    A: 60,
    S: 75,
    SS: 90,
  },
  pullUps: {
    F: 0,
    D: 2,
    C: 5,
    B: 8,
    A: 12,
    S: 16,
    SS: 20,
  },
  pushUps: {
    F: 0,
    D: 10,
    C: 20,
    B: 30,
    A: 40,
    S: 50,
    SS: 60,
  },
  barHang: {
    F: 0,
    D: 10,
    C: 20,
    B: 30,
    A: 45,
    S: 60,
    SS: 90,
  },
  plankHold: {
    F: 0,
    D: 20,
    C: 40,
    B: 60,
    A: 90,
    S: 120,
    SS: 180,
  },
  // Add more as needed...
};
