export const GET_DEVICE_SIZE = 'GET_DEVICE'

export const getDeviceSize = (size) => {
    return (dispatch) => {
        dispatch({
            type: GET_DEVICE_SIZE,
            playload: { size }
        });
    }
}