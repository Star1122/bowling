import { BowlingStateEnum } from '../enums/bowling-state.enum';

export interface IBowlingFrameScore {
  pins: number[];
  bonusPins: number[];
  state?: BowlingStateEnum;
}
