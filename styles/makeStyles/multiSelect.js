import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

export const StyledFormControl = styled(FormControl)`
  && {
    width: 100%;
    display: block;
    position: relative;
  }
`;

export const StyledAutoSelectInputLabel = styled(InputLabel)`
  && {
    position: relative;
    .req-labe {
      color: #f44336;
    }
    margin-top: 5px;
    transform: translate(0, 1.5px) scale(0.75);
    transform-origin: top left;
  }
`;

export const stylesReactSelect = {
  clearIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    margin: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    color: state.selectProps.error ? '#f44336' : 'rgba(0, 0, 0, 0.54)',
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    border: 0,
    borderBottom: state.selectProps.error
      ? '1px solid #f44336'
      : '1px solid rgba(0,0,0,0.87)',
    boxShadow: 'none',
    ':hover': {
      borderColor: state.selectProps.error ? '1px solid #f44336' : 'inherit',
      boxShadow: state.selectProps.error ? '1px solid #f44336' : 'none',
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0,
  }),
};
