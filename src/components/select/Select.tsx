import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as AngleDownIcon } from '../../assets/icons/chevron-down.svg';
import usePopup from '../../shared/hooks/usePopup';
import { ISelectOption } from '../../shared/interfaces/select-option.interface';

import './style.scss';

interface ISelectFieldProps {
  options: ISelectOption[];
  value: string | number;
  wrapperClassName?: string;
  placeholder?: string;
  onChange?: (value: string | number) => void;
}

const Select: React.FC<ISelectFieldProps> = (props) => {
  const {
    options,
    value,
    wrapperClassName = '',
    placeholder = '',
    onChange = (value) => value,
  } = props;

  const [optionValue, setOptionValue] = useState<ISelectOption | undefined>();
  const popupRef = useRef(null);
  const { isOpen, toggleMenu, closeMenu } = usePopup(popupRef);

  useEffect(() => {
    setOptionValue(options.find((option) => option.value === value));
  }, [value, options]);

  const handleChange = (value: string | number) => {
    onChange(value);
    setOptionValue(options.find((option) => option.value === value));
    closeMenu();
  };

  return (
    <div className={`select-wrapper ${wrapperClassName}`} ref={popupRef} data-testid="select">
      <div className="select-placeholder-wrapper" role="link" tabIndex={0} onClick={toggleMenu} data-testid="select-field">
        <p className="select-base-text">{optionValue ? optionValue.label : placeholder}</p>
        <AngleDownIcon width={14} height={14} className="angle-down-icon" />
      </div>
      {isOpen && (
        <div className="drop-panel" data-testid="select-panel">
          {options.map((option, index) => (
            <div
              key={option.value}
              role="link"
              tabIndex={index}
              className="drop-option"
              onClick={() => handleChange(option.value)}
              data-testid={`select-option-${index}`}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
