import React from 'react'
import { ErrorMessage } from "formik";

import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function customPasswordInput({ field, form, ...props }) {
    return (
        <FormControl
            className='login-form-row__input'
            variant="filled"
            error={props.error}
        >
            <InputLabel htmlFor="outlined-adornment-password">
                {props.label}
            </InputLabel>
            <FilledInput
                {...field}
                name={field.name}
                type={props.showPassword ? 'text' : 'password'}
                size={'small'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="Modifier la visibilité du mot de passe"
                            onClick={props.toggleShowPassword}
                        >
                            {props.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>
                <ErrorMessage name={field.name} />
            </FormHelperText>
        </FormControl>
    );
};