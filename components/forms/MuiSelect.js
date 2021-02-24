import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';

export default function MuiSelect({
  name,
  label,
  options,
  value,
  handleChange,
  ...props
}) {
  return (
    <FormControl fullWidth={true} variant="outlined" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        id={name}
        value={value}
        onChange={handleChange}
        label={label}
        {...props}
      >
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
