export const GET_DEVICE_SIZE = 'GET_DEVICE'
export const TOGGLE_DISPLAY_MENU_MOBIL= 'SET_DISPLAY_MENU_MOBIL'

export const getDeviceSize = (size) => {
    return (dispatch) => {
        dispatch({
            type: GET_DEVICE_SIZE,
            playload: { size }
        });
    }
}

export const toglleDisplayMenuMobile = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DISPLAY_MENU_MOBIL,
        });
    }
}