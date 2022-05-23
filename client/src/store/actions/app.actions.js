export const SET_DEVICE_SIZE = 'SET_DEVICE_SIZE'
export const SET_DISPLAY_MOBILE_MENU = 'SET_DISPLAY_MOBILE_MENU'

export const setDeviceSize = (deviceSize) => {
    return {
        type: SET_DEVICE_SIZE,
        playload: deviceSize
    };
}

export const setDisplayMobileMenu = (state) => {
    return {
        type: SET_DISPLAY_MOBILE_MENU,
        playload: state
    }
}