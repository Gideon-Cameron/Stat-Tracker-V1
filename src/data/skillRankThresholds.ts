import { Rank } from '../types/Rank';

export type SkillTest =
  | 'pushSkill'
  | 'pullSkill'
  | 'handstandSkill'
  | 'coreSkill'
  | 'legSkill'
  | 'leverSkill';

export const skillRankThresholds: Record<SkillTest, Record<string, Rank>> = {
  pushSkill: {
    standard: 'E',
    decline: 'D',
    archer: 'C',
    explosive: 'B',
    clap: 'A',
    superman: 'S',
    pseudoPlanche: 'SS',
    planche: 'Mythic',
  },
  pullSkill: {
    standard: 'E',
    chestToBar: 'D',
    archer: 'C',
    explosive: 'B',
    high: 'A',
    muscleUp: 'S',
    oneArmAssist: 'SS',
    oneArm: 'Mythic',
  },
  handstandSkill: {
    wall5: 'E',
    wall15: 'D',
    free5: 'C',
    free15: 'B',
    handstandPushWall: 'A',
    handstandPushFree: 'S',
    oneArmAssist: 'SS',
    oneArmFree: 'Mythic',
  },
  coreSkill: {
    tuck: 'E',
    oneLeg: 'D',
    lsit5: 'C',
    lsit15: 'B',
    vsit: 'A',
    pressAssist: 'S',
    pressFree: 'SS',
    straddlePlanche: 'Mythic',
  },
  legSkill: {
    airSquat: 'E',
    jumpSquat: 'D',
    splitSquat: 'C',
    shrimpSquat: 'B',
    pistolSquat: 'A',
    pistolJump: 'S',
    elevatedPistol: 'SS',
    pistolToBox: 'Mythic',
  },
  leverSkill: {
    hollow: 'E',
    tuck: 'D',
    advTuck: 'C',
    straddle: 'B',
    full5: 'A',
    full15: 'S',
    leverPull: 'SS',
    leverPullups: 'Mythic',
  },
};
