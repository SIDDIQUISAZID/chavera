import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { dishNetworkApi } from "../app/services";
import tooltipReducer from "./tooltip/tooltipSlice";
//rootReducer to combine all reducers
const rootReducer = combineReducers({
  [dishNetworkApi.reducerPath]: dishNetworkApi.reducer,
  auth: authReducer,
  tooltip: tooltipReducer,
});

export default rootReducer;
