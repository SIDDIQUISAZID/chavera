const SET_LOGIN_INFO = "SET_LOGIN_INFO";

export function setLoginInfo(val) {
  return {
    type: SET_LOGIN_INFO,
    payload: {
      loginInfo: val,
    },
  };
}

const initialState = {
  loginInfo: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_INFO: {
      return Object.assign({}, state, {
        loginInfo: action.payload.loginInfo,
      });
    }

    default: {
      return state;
    }
  }
}
