import React from 'react';

import { BowlingStateEnum } from '../../shared/enums/bowling-state.enum';
import { sumArray } from '../../shared/helpers/sumArray.helper';
import { IBowlingFrameScore } from '../../shared/interfaces/bowling-frame-score.interface';
import Chip from '../chip';

import './style.scss';

interface IChipProps {
  scoreInfo: IBowlingFrameScore;
  className?: string;
  isActive?: boolean;
  isLast?: boolean;
}

const BowlingFrame: React.FC<IChipProps> = (props) => {
  const { className, isActive, isLast, scoreInfo: { pins, bonusPins, state } } = props;

  const score = sumArray(pins) + sumArray(bonusPins);

  return (
    <div className={`bowling-frame-wrapper ${className} ${isActive ? 'active-frame' : ''}`} data-testid="bowling-frame">
      {!isLast && <Chip />}
      <Chip className="roll" value={state === BowlingStateEnum.strike ? '⨉' : pins[0]} />
      <Chip className="roll" value={state === BowlingStateEnum.spare ? '⁄' : pins[1] === 10 ? '⨉' : pins[1]} />
      {isLast && <Chip className="roll" value={pins[2] === 10 ? '⨉' : pins[2]} />}
      <div className="score-text"><Chip value={(pins.length > 0 || isActive) ? score : ''} /></div>
    </div>
  );
};

export default BowlingFrame;
