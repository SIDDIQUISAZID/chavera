const SET_OPEN_CURRENT_MODAL = "SET_OPEN_CURRENT_MODAL";

export function setOpenCurrentModal(val) {
  return {
    type: SET_OPEN_CURRENT_MODAL,
    payload: {
      currentModal: val,
    },
  };
}

const initialState = {
  currentModal: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OPEN_CURRENT_MODAL: {
      return Object.assign({}, state, {
        currentModal: action.payload.currentModal,
      });
    }

    default: {
      return state;
    }
  }
}
