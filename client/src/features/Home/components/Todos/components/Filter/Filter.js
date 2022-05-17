import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { visibilityFilters } from '../../../../../../store/actions/todos.actions';


export default function Filter({ dispatchSetFilter, filter }) {

    const handleChange = (e, newFilter) => dispatchSetFilter(newFilter)


    return (
        <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value={visibilityFilters.SHOW_ALL}>Tout</ToggleButton>
            <ToggleButton value={visibilityFilters.SHOW_DONE}>Fini</ToggleButton>
            <ToggleButton value={visibilityFilters.SHOW_ACTIVE}>En cours</ToggleButton>
        </ToggleButtonGroup>
    )
}
