import React, { forwardRef } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

export default function FormInput(props) {
  const { control } = useFormContext();
  const { name, label, errorobj, type } = props;
  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  return (
    <Controller
      render={(props) => (
        <TextField
          {...props}
          value={props.value}
          label={label}
          inputRef={props.ref}
          onChange={props.onChange}
          variant="outlined"
          margin="normal"
          fullWidth={true}
          error={isError}
          helperText={errorMessage}
          type={type}
        />
      )}
      name={name}
      control={control}
      rules={{ required: true }}
      defaultValue=""
      {...props}
    />
  );
}
