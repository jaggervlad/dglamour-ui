import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

export default function FormInput(componentProps) {
  const { control } = useFormContext();
  const { name, label, errorobj, type } = componentProps;
  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  return (
    <Controller
      render={({ value, ref, onChange }) => (
        <TextField
          value={value}
          label={label}
          inputRef={ref}
          onChange={onChange}
          variant="outlined"
          margin="normal"
          fullWidth={true}
          error={isError}
          helperText={errorMessage}
          type={type}
          {...componentProps}
        />
      )}
      defaultValue=""
      name={name}
      control={control}
      rules={{ required: true }}
    />
  );
}
