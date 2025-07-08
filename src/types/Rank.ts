export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'Mythic';

// New visual-only sub-rank type (for display and UI logic)
export type SubRank =
  | 'E-'
  | 'E'
  | 'E+'
  | 'D-'
  | 'D'
  | 'D+'
  | 'C-'
  | 'C'
  | 'C+'
  | 'B-'
  | 'B'
  | 'B+'
  | 'A-'
  | 'A'
  | 'A+'
  | 'S-'
  | 'S'
  | 'S+'
  | 'SS-'
  | 'SS'
  | 'SS+'
  | 'Mythic';
