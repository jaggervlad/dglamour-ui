import { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import {
  StyledFormControl,
  StyledAutoSelectInputLabel,
  stylesReactSelect,
} from '@/styles/makeStyles/multiSelect';

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
  const { label, options, name } = props;
  return (
    <>
      <StyledFormControl>
        <StyledAutoSelectInputLabel>
          <span>{label}</span>
        </StyledAutoSelectInputLabel>
        <Select
          isMulti={true}
          options={options}
          getOptionValue={(opc) => opc.id}
          getOptionLabel={(opc) => `${opc.label}`}
          noOptionsMessage={() => 'No hay resultados'}
          placeholder="Porfavor Selecciona"
          components={components}
          isClearable={true}
          // styles={stylesReactSelect}
          {...props}
        />
      </StyledFormControl>
    </>
  );
}

export default function FormAutoSelectComplete(props) {
  const { control } = useFormContext();
  const { name, label, options } = props;
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const newOptions = options.map((data, index) => ({
      label: data.label,
      value: data.id,
    }));
    setNewData(newOptions);
  }, [options]);

  return (
    <>
      <Controller
        as={ReactSelect}
        name={name}
        control={control}
        label={label}
        defaultValue={[]}
        {...props}
        options={newData}
      />
    </>
  );
}
