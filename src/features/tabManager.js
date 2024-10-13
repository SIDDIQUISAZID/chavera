const SET_OPEN_CURRENT_TAB = "SET_OPEN_CURRENT_TAB";

export function setOpenCurrentTab(val) {
  return {
    type: SET_OPEN_CURRENT_TAB,
    payload: {
      currentTab: val,
    },
  };
}

const initialState = {
  currentTab: "dashboard",

  openSimDialog: false, // boolean for ConfigDialog.js
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_CURRENT_TAB: {
      return Object.assign({}, state, {
        currentTab: action.payload.currentTab,
      });
    }

    default: {
      return state;
    }
  }
}
