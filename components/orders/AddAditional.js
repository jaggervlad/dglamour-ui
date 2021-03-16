
import { Grid, TextField } from '@material-ui/core';
import { useOrder } from 'contexts/OrderProvider';
import React, { useState, useEffect } from 'react';

export default function AddAditional({ defaultValue }) {
    const [aditional, setAditional] = useState(defaultValue ? defaultValue : 0);
    const { addAditional, updateTotal } = useOrder();

    useEffect(() => {
        addAditional(Number(aditional));
        updateTotal();
    }, [aditional]);

    function handleChange(param) {
        setAditional(param);
    }

    return (
        <Grid item xs={2}>
            <TextField
                type="number"
                value={aditional}
                label="Adicional"
                onChange={(e) => handleChange(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth={true}
            />
        </Grid>
    );
}