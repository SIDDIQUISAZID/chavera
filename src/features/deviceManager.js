const SET_DEVICE_ID = "SET_DEVICE_ID"

export function setDeviceId(val) {
    return {
        type: SET_DEVICE_ID,
        payload: {
            deviceId: val
        }
    }
}

const initialState = {
    deviceId:""
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SET_DEVICE_ID:{
            return Object.assign({}, state, {
                deviceId: action.payload.deviceId,
            });
        }
      
        default: {
            return state;
        }
    }
}