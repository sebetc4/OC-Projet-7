import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleColorMode } from '../../../../../../store/actions/app.actions';


export default function DeleteAccountForm({ closeAccordion }) {

    // Hooks
    const dispatch = useDispatch();

    // Store
    const colorMode = useSelector((state) => state.app.colorMode)

    const handleColorMode = () => dispatch(toggleColorMode())

    return (
        <div className='settings-form__button-container'>
            <Button
                onClick={handleColorMode}
                color='secondary'
                variant="contained"
                endIcon={
                    colorMode === 'dark' ?
                        <Brightness7Icon color="toggleColorMode" />
                        :
                        <Brightness4Icon color="toggleColorMode" />
                }
            >
                {colorMode === 'dark' ?
                    'Mode clair'
                    :
                    'Mode sombre'
                }
            </Button>
        </div>
    )
}
