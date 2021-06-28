import React from 'react';
import { FormControlLabel, Radio, Input, InputAdornment } from '@material-ui/core';

import '../../../../styles/pages/currentGame/GeneralSettings.scss';

const OtherRadioComponent = ({
  onChange,
  value,
  checked,
  disabledInput,
  onTextChange,
  name,
  startText,
  endText,
}) => {
  return (
    <FormControlLabel
      onChange={onChange}
      value={value}
      checked={checked}
      control={<Radio />}
      label={
        value ? (
          <Input
            className='currentGame__settings_input'
            disabled={disabledInput}
            onChange={onTextChange}
            name={name}
            type="number"
            value={value}
            startAdornment={
              <InputAdornment position="start">
                <div>{startText}</div>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <div>{endText}</div>
              </InputAdornment>
            }
          />
        ) : (
          startText
        )
      }
    />
  );
};

export default OtherRadioComponent;
