export const SET_ERROR = 'SET_ERROR'
export const DELETE_ERROR = 'DELETE_ERROR'
export const SET_INVALID_TOKEN = 'SET_INVALID_TOKEN'
export const RESET_ERROR = 'RESET_ERROR'

export const resetError = () => {
    return {
        type: RESET_ERROR,
        playload: ''
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR,
        playload: error
    }
}

export const deleteError = () => {
    return {
        type: DELETE_ERROR,
        playload: ''
    }
}

export const setInvalidToken = () => {
    return {
        type: SET_INVALID_TOKEN,
        playload: ''
    }
}