const SET_ETC_ID = "SET_ETC_ID";
const SET_TESTCASE_ID = "SET_TESTCASE_ID";

export function SelectedTestCaseDetail(val) {
  return {
    type: SET_ETC_ID,
    payload: {
      SelectedTestCase: val,
    },
  };
}

export function setTestcaseID(val) {
  return {
    type: SET_TESTCASE_ID,
    payload: {
      testcaseId: val,
    },
  };
}

const initialState = {
  SelectedTestCase: null,
  testcaseId: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ETC_ID: {
      console.log("....edbhed", action.payload);
      return Object.assign({}, state, {
        SelectedTestCase: action.payload.SelectedTestCase,
      });
    }

    case SET_TESTCASE_ID: {
      return Object.assign({}, state, {
        testcaseId: action.payload.testcaseId,
      });
    }

    default: {
      return state;
    }
  }
}
