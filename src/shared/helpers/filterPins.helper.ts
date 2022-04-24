import { ScoreOptions } from '../constants';

export const filterPins = (remainedPins: number, isStrike: boolean = true) => {
  const [lastOption, ...remainedOptions] = ScoreOptions.filter((opt) => opt.value <= remainedPins).reverse();

  if (remainedOptions.length === 0) {
    return [lastOption];
  }

  if (isStrike) {
    return [...remainedOptions.reverse(), { ...lastOption, label: `${lastOption.label} (Strike)` }];
  } else {
    return [...remainedOptions.reverse(), { ...lastOption, label: `${lastOption.label} (Spare)` }];
  }
}
