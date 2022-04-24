import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { ScoreOptions } from '../../shared/constants';
import Select from './Select';


describe('<Select />', () => {
  it('should render when Select component', () => {
    const handleChange = jest.fn();

    const selectedOption = ScoreOptions.find((option) => option.value === 5);

    const { getByTestId, container } = render(
      <Select
        options={ScoreOptions}
        value={5}
        onChange={handleChange}
      />
    );

    expect(container.getElementsByClassName('angle-down-icon')).toHaveLength(1);
    expect(container.getElementsByClassName('select-base-text').item(0)).toContainHTML((selectedOption?.label || '').toString());
    expect(getByTestId('select-field')).toBeInTheDocument();

    act(() => {
      getByTestId('select-field').click();
    });

    expect(getByTestId('select-panel')).toBeInTheDocument();
    expect(container.getElementsByClassName('drop-option')).toHaveLength(11);

    act(() => {
      getByTestId('select-option-0').click();
    });

    expect(container.getElementsByClassName('select-base-text').item(0)).toContainHTML(ScoreOptions[0].label.toString());
  });
});
