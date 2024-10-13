import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { dishNetworkApi } from "./services";
import rootReducer from "../features";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dishNetworkApi.middleware),
  });
};

export const store = setupStore();
// enable listener behavior for the store
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
