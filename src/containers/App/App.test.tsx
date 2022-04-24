import { render } from '@testing-library/react';
import React from 'react';

import { GameStateEnum } from '../../shared/enums/game-state.enum';
import { filterPins } from '../../shared/helpers/filterPins.helper';
import useGameInfo from '../../shared/hooks/useGameInfo';
import App from './App';

jest.mock('../../shared/hooks/useGameInfo');

describe('<App />', () => {
  let mockUseGameInfo = jest.fn();

  beforeEach(() => {
    mockUseGameInfo = useGameInfo as jest.Mock;
  });

  it('should render when game state is ready to start', () => {
    mockUseGameInfo.mockReturnValue({
      gameState: GameStateEnum.ready,
    });
    const { getByRole, getByText } = render(<App />);

    expect(getByText('Bowling Game')).toBeInTheDocument();
    expect(getByText('is ready')).toBeInTheDocument();
    expect(getByRole('button').innerHTML).toEqual('Start Game');
  });

  it('should render when game state is finished', () => {
    mockUseGameInfo.mockReturnValue({
      gameState: GameStateEnum.finished,
      score: 0,
      scoreRecord: new Array(10).fill('').map(() => ({ pins: [], bonusPins: [] })),
    });
    const { getAllByTestId, getByRole, container } = render(<App />);

    expect(container.getElementsByClassName('game-description').item(0))
      .toContainHTML('Game has finished.<br />Your score is 0');
    expect(getByRole('button').innerHTML).toEqual('Restart Game');
    expect(getAllByTestId('bowling-frame')).toHaveLength(10);
  });

  it('should render when game state is progressing', () => {
    mockUseGameInfo.mockReturnValue({
      gameState: GameStateEnum.progressing,
      score: 0,
      frame: 1,
      shot: 1,
      pinOptions: filterPins(10),
      scoreRecord: new Array(10).fill('').map(() => ({ pins: [], bonusPins: [] })),
    });
    const { getAllByTestId, getByRole, getByTestId, container } = render(<App />);

    expect(container.getElementsByClassName('game-info-chip')).toHaveLength(3);
    expect(getByTestId('select')).toBeInTheDocument();
    expect(getByRole('button').innerHTML).toEqual('Next');
    expect(getAllByTestId('bowling-frame')).toHaveLength(10);
  });
});
