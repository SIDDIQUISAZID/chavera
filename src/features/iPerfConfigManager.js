const SET_IPERFCONFIG_ID = "SET_IPERFCONFIG_ID";


export function setIperfConfigId(val) {
    return {
        type: SET_IPERFCONFIG_ID,
        payload: {
            iperfConfigId: val
        }
    }
}

const initialState = {
    iperfConfigId:""   
}

export default function reducer(state = initialState, action) {
    switch (action.type) {

        case SET_IPERFCONFIG_ID:{
            return Object.assign({}, state, {
                iperfConfigId: action.payload.iperfConfigId,
            });
        }
      
        default: {
            return state;
        }
    }
}