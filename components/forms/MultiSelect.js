import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import {
  StyledFormControl,
  StyledAutoSelectInputLabel,
  stylesReactSelect,
} from '@/styles/makeStyles/multiSelect';
import { FormHelperText } from '@material-ui/core';

function Option(props) {
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps;

  return (
    <div {...newInnerProps} className="autoselect-options">
      {props.children}
    </div>
  );
}

const components = {
  Option,
};

function ReactSelect(props) {
  const {
    label,
    newOptions,
    name,
    innerRef,
    value,
    onChange,
    errorobj,
  } = props;
  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <>
      <StyledFormControl>
        <StyledAutoSelectInputLabel>
          <span>{label}</span>
        </StyledAutoSelectInputLabel>
        <Select
          {...props}
          getOptionValue={(opc) => opc.id}
          getOptionLabel={(opc) => `${opc.label}`}
          noOptionsMessage={() => 'No hay resultados'}
          placeholder="Porfavor Selecciona"
          components={components}
          isClearable={true}
          isSearchable={true}
          styles={stylesReactSelect}
          ref={innerRef}
          value={value}
          onChange={onChange}
          options={newOptions}
          key="id"
          isMulti={true}
        />
        {isError && (
          <FormHelperText error={isError}>{errorMessage}</FormHelperText>
        )}
      </StyledFormControl>
    </>
  );
}

export default function FormSelectAutoComplete(props) {
  const { control } = useFormContext();
  const { name, label, options } = props;
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const newOptions = options.map((data) => ({
      label: data.nombre,
      value: data.id,
    }));
    setNewData(newOptions);
  }, [options]);

  return (
    <>
      <Controller
        render={({ ref, value, onChange }) => {
          return (
            <ReactSelect
              innerRef={ref}
              value={value}
              onChange={onChange}
              newOptions={newData}
              label={label}
              name={name}
              {...props}
            />
          );
        }}
        name={name}
        control={control}
        defaultValue={[]}
        rules={{ required: true }}
      />
    </>
  );
}
