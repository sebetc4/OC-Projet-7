import React from 'react'
import { visibilityFilters } from '../../../../../../store/actions/todos.actions';


export default function Filter({ dispatchSetFilter }) {

    return (
        <>
            <button
                className="btn btn-primary mr-2"
                onClick={() => dispatchSetFilter(visibilityFilters.SHOW_ALL)}
            >
                Tout
            </button>

            <button
                className="btn btn-primary mr-2"
                onClick={() => dispatchSetFilter(visibilityFilters.SHOW_DONE)}
            >
                Fini
            </button>

            <button
                className="btn btn-primary"
                onClick={() => dispatchSetFilter(visibilityFilters.SHOW_ACTIVE)}
            >
                En cours
            </button>
        </>
    )
}
