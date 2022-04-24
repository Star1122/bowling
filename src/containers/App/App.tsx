import React from 'react';

import BowlingFrame from '../../components/bowling-frame';
import Chip from '../../components/chip';
import Select from '../../components/select';
import { GameStateEnum } from '../../shared/enums/game-state.enum';
import useGameInfo from '../../shared/hooks/useGameInfo';

import './App.scss';

function App() {
  const {
    downPins,
    frame,
    score,
    scoreRecord,
    shot,
    gameState,
    pinOptions,
    handlePinsDown,
    resetStates,
    setDownPins,
  } = useGameInfo();

  const handleState = (state: GameStateEnum) => {
    resetStates(state);
  };

  return (
    <div className="app">
      <div className="game-board-wrapper">
        {[GameStateEnum.progressing, GameStateEnum.finished].includes(gameState) && (
          <div className="game-frames-wrapper">
            {scoreRecord.map((item, index) => (
              <BowlingFrame
                key={index}
                scoreInfo={item}
                isActive={index === frame - 1}
                isLast={index === scoreRecord.length - 1}
              />
            ))}
          </div>
        )}
        <div className="game-board">
          {gameState === GameStateEnum.ready && (
            <>
              <p className="game-description"><b>Bowling Game</b> is ready</p>
              <button
                className="game-button"
                onClick={() => handleState(GameStateEnum.progressing)}
              >
                Start Game
              </button>
            </>
          )}
          {gameState === GameStateEnum.finished && (
            <>
              <p className="game-description">Game has finished.<br />Your score is {score}.</p>
              <button
                className="game-button"
                onClick={() => handleState(GameStateEnum.progressing)}
              >
                Restart Game
              </button>
            </>
          )}
          {gameState === GameStateEnum.progressing && (
            <>
              <div className="game-info-wrapper">
                <h2 className="title">Game Score Board</h2>
                <Chip className="game-info-chip" label="Frame" value={frame} />
                <Chip className="game-info-chip" label="Shot" value={shot + 1} />
                <Chip className="game-info-chip" label="Score" value={score} />
              </div>
              <div className="game-score-wrapper">
                <Select
                  wrapperClassName="pin-value-field"
                  options={pinOptions}
                  value={downPins}
                  onChange={(value) => setDownPins(value as number)}
                />
              </div>
              <div className="game-commit-wrapper">
                <button className="next-button" onClick={handlePinsDown}>Next</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
