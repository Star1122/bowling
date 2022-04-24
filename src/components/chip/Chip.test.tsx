import { render, waitFor } from '@testing-library/react';
import React from 'react';

import Chip from './Chip';

describe('<Chip />', () => {
  it('should render Chip component', async () => {
    const { container } = render(<Chip label="Chip" value="chip value" />);

    expect(container.getElementsByClassName('changing')).toHaveLength(1);
    expect(container.getElementsByClassName('label')).toHaveLength(1);
    expect(container.getElementsByClassName('label').item(0)).toContainHTML('Chip');
    expect(container.getElementsByClassName('value').item(0)).toContainHTML('chip value');
    await waitFor(() => expect(container.getElementsByClassName('changing')).toHaveLength(0));
  });

  it('should not render label', async () => {
    const { container } = render(<Chip value="chip value" />);

    expect(container.getElementsByClassName('label')).toHaveLength(0);
  });
});
