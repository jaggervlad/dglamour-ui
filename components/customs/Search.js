import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

export default function Search(props) {
  const { handleSearch } = props;
  return (
    <TextField
      onChange={handleSearch}
      defaultValue=""
      label="Buscar"
      type="text"
      variant="outlined"
      margin="dense"
      InputProps={{
        startAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
