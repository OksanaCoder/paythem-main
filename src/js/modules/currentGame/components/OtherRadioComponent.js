import React from 'react';
import { FormControlLabel, Radio, Input, InputAdornment } from '@material-ui/core';

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
            disabled={disabledInput}
            onChange={onTextChange}
            name={name}
            type="number"
            value={value}
            startAdornment={<InputAdornment position="start">{startText}</InputAdornment>}
            endAdornment={<InputAdornment position="end">{endText}</InputAdornment>}
          />
        ) : (
          startText
        )
      }
    />
  );
};

export default OtherRadioComponent;
