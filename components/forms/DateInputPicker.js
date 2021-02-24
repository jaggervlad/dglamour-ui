import { KeyboardDatePicker } from '@material-ui/pickers';
import React from 'react';

export default function DateInputPicker({ value, label, onChange, ...props }) {
  return (
    <KeyboardDatePicker
      style={{ minWidth: '200px' }}
      variant="dialog"
      margin="normal"
      label={label}
      format="dd/MM/yyyy"
      value={value}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      {...props}
    />
  );
}
