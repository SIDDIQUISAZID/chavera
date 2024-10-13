import * as React from "react";
import { DASHBOARD } from "../../utils/commonTextFile";
import { ADMIN_DASHBOARD } from "../../utils/commonTextFile";

export default function DashboardHeader() {
  return (
    <>
      <div className="flex font-poppins_cf text-[10px]">
        <div className="font-poppins_cf text-[10px] text-theme-dark ">
          {DASHBOARD}
        </div>
      </div>
      <div className="text-xl font-medium mb-4 text-[22px]">
        {ADMIN_DASHBOARD}
      </div>
    </>
  );
}
