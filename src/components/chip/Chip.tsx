import React, { useEffect, useState } from 'react';

import './style.scss';

interface IChipProps {
  label?: string | number;
  value?: string | number;
  className?: string;
}

const Chip: React.FC<IChipProps> = (props) => {
  const { label, value, className = '' } = props;
  const [chipValue, setChipValue] = useState<string | number>();
  const [valueChanged, setValueChanged] = useState(false);

  useEffect(() => {
    setValueChanged(true);

    setTimeout(() => {
      setValueChanged(false);
      setChipValue(value);
    }, 250);
  }, [value]);

  return (
    <p className={`chip-wrapper ${className}`} data-testid="chip">
      {label && <span className="label">{label}:</span>}
      <span className="value">
        <span
          className={`${chipValue === undefined || chipValue === '' ? 'empty' : ''} ${valueChanged ? `changing` : ''}`
          }
        >
          {chipValue || value}
        </span>
        {valueChanged && <span>{value}</span>}
      </span>
    </p>
  );
};

export default Chip;
