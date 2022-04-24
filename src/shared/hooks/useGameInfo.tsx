import { useEffect, useState } from 'react';

import { BowlingStateEnum } from '../enums/bowling-state.enum';
import { GameStateEnum } from '../enums/game-state.enum';
import { filterPins } from '../helpers/filterPins.helper';
import { sumArray } from '../helpers/sumArray.helper';
import { IBowlingFrameScore } from '../interfaces/bowling-frame-score.interface';
import { ISelectOption } from '../interfaces/select-option.interface';

interface IUseGameInfoReturnProps {
  downPins: number;
  frame: number;
  gameState: GameStateEnum;
  pinOptions: ISelectOption[];
  score: number;
  scoreRecord: IBowlingFrameScore[];
  shot: number;
  handlePinsDown: () => void;
  resetStates: (state: GameStateEnum) => void;
  setDownPins: (pins: number) => void;
}

const PINS_NUMBER = 10;
const FRAMES_NUMBER = 10;

const useGameInfo = (): IUseGameInfoReturnProps => {
  const [score, setScore] = useState<number>(0);
  const [scoreRecord, setScoreRecord] =
          useState<IBowlingFrameScore[]>(new Array(FRAMES_NUMBER).fill('').map(() => ({ pins: [], bonusPins: [] })));
  const [downPins, setDownPins] = useState<number>(0);
  const [remainedPins, setRemainedPins] = useState<number>(PINS_NUMBER);
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [shot, setShot] = useState<number>(0);
  const [gameState, setGameState] = useState<GameStateEnum>(GameStateEnum.ready);
  const [filteredOptions, setFilteredOptions] = useState<ISelectOption[]>(filterPins(PINS_NUMBER));

  useEffect(() => {
    setRemainedPins((pins) => shot === 0 ? PINS_NUMBER - downPins : pins - downPins);
  }, [downPins, shot]);

  const getFrameState = (pinsFall: number, shot: number) => {
    if (pinsFall === PINS_NUMBER && shot === 0) {
      return BowlingStateEnum.strike;
    } else if (pinsFall === Math.max(...filteredOptions.map((option) => +option.value))) {
      return BowlingStateEnum.spare;
    }
    return BowlingStateEnum.none;
  };

  const handlePinsDown = () => {
    if (gameState !== GameStateEnum.progressing) {
      return;
    }

    scoreRecord
      .filter((frame, index) =>
        index !== currentFrame - 1 &&
        (
          (frame.state === BowlingStateEnum.spare && frame.bonusPins.length < 1) ||
          (frame.state === BowlingStateEnum.strike && frame.bonusPins.length < 2)
        ),
      )
      .forEach((frame) => frame.bonusPins.push(downPins));

    scoreRecord[currentFrame - 1].pins.push(downPins);

    if (
      currentFrame >= PINS_NUMBER &&
      (shot >= 2 || (scoreRecord[scoreRecord.length - 1].state === BowlingStateEnum.none && shot === 1))
    ) {
      setGameState(GameStateEnum.finished);
    }

    setScore(sumArray(scoreRecord.map((frame) => sumArray(frame.pins) + sumArray(frame.bonusPins))));
    setDownPins(0);

    if (currentFrame < FRAMES_NUMBER && (remainedPins === 0 || shot > 0)) {
      scoreRecord[currentFrame - 1].state = getFrameState(downPins, shot);

      setCurrentFrame((frm) => frm + 1);
      setShot(0);
      setFilteredOptions(filterPins(PINS_NUMBER));
    } else {
      if ((remainedPins === 0 || shot > 0) && getFrameState(downPins, shot) === BowlingStateEnum.none) {
        setGameState(GameStateEnum.finished);
      }

      if (remainedPins <= 0) {
        setRemainedPins(PINS_NUMBER);
        setFilteredOptions(filterPins(PINS_NUMBER));
        if (!scoreRecord[currentFrame - 1].state) {
          scoreRecord[currentFrame - 1].state = getFrameState(downPins, shot);
        }
      } else {
        setFilteredOptions(filterPins(remainedPins, false));
      }

      if (shot < 2) {
        setShot((shotCount) => shotCount + 1);
      }
    }

    setScoreRecord([...scoreRecord]);
  };

  const resetStates = (state: GameStateEnum) => {
    setShot(0);
    setCurrentFrame(1);
    setRemainedPins(PINS_NUMBER);
    setGameState(state);
    setScore(0);
    setFilteredOptions(filterPins(PINS_NUMBER));
    setScoreRecord(new Array(10).fill('').map(() => ({ pins: [], bonusPins: [] })));
  };

  return {
    pinOptions: filteredOptions,
    downPins,
    frame: currentFrame,
    gameState,
    score,
    scoreRecord,
    shot,
    setDownPins,
    handlePinsDown,
    resetStates,
  };
};

export default useGameInfo;
