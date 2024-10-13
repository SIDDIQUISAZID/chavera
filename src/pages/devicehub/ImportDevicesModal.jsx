import React from "react";
import { Button } from "@mui/material";

const ImportDevicesModal = ({ onImportSucces }) => {
  return (
    <div>
      <div>
        <div
          data-testid="openModal "
          className="flex  w-80 flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="my-2 flex items-center ">
            <Button
              variant="outlined"
              size="small"
              style={{
                borderColor: "#EC1944",
                color: "#EC1944",
              }}
              sx={{
                textTransform: "none",
                fontSize: "12px",
                fontWeight: "400",
              }}
              className="  font-poppins_cf text-xs text-theme-black"
              onClick={() => {}}
            >
              Choose File
            </Button>

            <div className="mx-2 font-poppins_cf text-xs font-normal text-theme-grey">
              No file Selected
            </div>
          </div>

          <hr />

          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Close popup"
              //   onClick={onAddSuccess}
              className="w-[90px] cursor-pointer rounded-md border-2 bg-white p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            <button
              title="Decline"
              //   onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDevicesModal;
