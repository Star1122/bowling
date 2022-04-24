import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { BowlingStateEnum } from '../../shared/enums/bowling-state.enum';
import BowlingFrame from './BowlingFrame';

describe('<BowlingFrame />', () => {
  it('should render BowlingFrame component', () => {
    const { getAllByTestId, getByTestId, container } = render(<BowlingFrame
      scoreInfo={{ pins: [9, 1], bonusPins: [5] }} />);

    expect(getByTestId('bowling-frame')).toBeInTheDocument();
    expect(container.getElementsByClassName('score-text').item(0)).toContainHTML('15');
    expect(getAllByTestId('chip')).toHaveLength(4);
  });

  it('should render strike', async () => {
    const { getByText } = render(
      <BowlingFrame scoreInfo={{ pins: [10], bonusPins: [5, 5], state: BowlingStateEnum.strike }} />,
    );

    await waitFor(() => expect(getByText('⨉')).toBeInTheDocument());
  });

  it('should render spare', async () => {
    const { getByText } = render(
      <BowlingFrame scoreInfo={{ pins: [9, 1], bonusPins: [5], state: BowlingStateEnum.spare }} />,
    );

    await waitFor(() => expect(getByText('⁄')).toBeInTheDocument());
  });

  it('should render when isActive is true', async () => {
    const { container } = render(
      <BowlingFrame scoreInfo={{ pins: [], bonusPins: [] }} isActive />,
    );

    expect(container.getElementsByClassName('active-frame')).toHaveLength(1);
  });
});
