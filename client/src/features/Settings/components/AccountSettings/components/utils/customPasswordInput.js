import React from 'react'
import { ErrorMessage } from "formik";



import { OutlinedInput, IconButton, InputLabel, InputAdornment, FormHelperText, FormControl } from '@mui/material/';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function customPasswordInput({ field, form, ...props }) {
    return (
        <FormControl
            className='settings-form-row__inputs'
            size={'small'}
            variant="outlined"
            error={props.error}
            color='secondary'
        >
            <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
            <OutlinedInput
                {...field}
                name={field.name}
                type={props.showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Modifier la visibilité du mot de passe"
                            onClick={props.toggleShowPassword}
                            edge="end"
                        >
                            {props.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={props.label}
            />
            <FormHelperText>
                <ErrorMessage name={field.name} />
            </FormHelperText>
        </FormControl>
    );
};