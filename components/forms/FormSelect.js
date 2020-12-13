import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormStyles } from '../../styles/makeStyles/forms';
import { FormHelperText } from '@material-ui/core';

const MuiSelect = (props) => {
  const classes = useFormStyles();
  const { label, name, options, errorobj } = props;
  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <FormControl
      fullWidth={true}
      error={isError}
      variant="outlined"
      margin="normal"
    >
      <InputLabel htmlFor={name} className={classes.formControl}>
        {label}
      </InputLabel>
      <Select id={name} {...props}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default function FormSelect(props) {
  const { control } = useFormContext();
  const { name, label, options } = props;

  return (
    <>
      <Controller
        render={(props) => {
          return (
            <MuiSelect
              inputRef={props.ref}
              label={label}
              options={options}
              value={props.value}
              onChange={props.onChange}
            />
          );
        }}
        control={control}
        name={name}
        defaultValue=""
        rules={{ required: true }}
      />
    </>
  );
}
