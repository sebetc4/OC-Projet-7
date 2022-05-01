export const SET_DEVICE_SIZE = 'SET_DEVICE_SIZE'
export const TOGGLE_DISPLAY_MENU_MOBIL= 'TOGGLE_DISPLAY_MENU_MOBIL'

export const setDeviceSize = (deviceSize) => {
    return (dispatch) => {
        dispatch({
            type: SET_DEVICE_SIZE,
            playload: { deviceSize }
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