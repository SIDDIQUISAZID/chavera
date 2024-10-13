import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const initialState:{ isOpen: "idle" | string } = { isOpen: "idle" } 
const tooltipSlice = createSlice({
  name: "tooltip",
  initialState,
  reducers: {
    updateTooltipStatus: (
      state,
      { payload: { status } }: PayloadAction<{ status: "idle" | string }>
    ) => {
      state.isOpen = status || initialState.isOpen;
    },
  },
});

export const { updateTooltipStatus } = tooltipSlice.actions;

export default tooltipSlice.reducer;

// export const selectRoleId = (state: RootState):RoleIdType => state.auth.roleid;
export const selectTooltipStatus = (state: RootState) => state.tooltip.isOpen;
