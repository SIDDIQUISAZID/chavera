import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import Card from "@mui/material/Card";
import { IC_ARROW_RIGHT } from "../../assets/icons";

interface DeviceProps {
  title: string;
  dashboardData?: {
    data: {
      chartData: {
        deviceFree: number;
        deviceInUse: number;
        deviceTotal: number;
      };
    };
  };
}

const TotalQueryCXO: React.FC<DeviceProps> = ({ title, dashboardData }) => {
 
  return (
    <Card
      variant="outlined"
      className="flex w-full flex-col justify-between p-4 shadow-lg"
    >
      <div className="flex justify-between">
        <div className="font-poppins_cf text-base text-theme-black">
          {title}
        </div>
        <IC_ARROW_RIGHT className="cursor-pointer" />
      </div>
      <div className=" items-center justify-between">
        <div>
          <div className="font-poppins_cf text-2xl font-semibold text-theme-dark">
         200
          </div>
          <div className="mb-2 font-poppins_cf text-xs font-normal text-theme-grey">
          Total Queries
          </div>
        </div>
        <div className="h-2 w-full border-t border-gray-300"></div>
        <div className="flex items-center justify-between gap-6">
          <div className=" items-center gap-4">
            <div className=" font-poppins_w text-xs text-theme-black">
            Resolve
            </div>
            <div className="font-poppins_cf text-xs text-theme-grey mt-1">182</div>
          </div>

          
            <div className=" items-center gap-4">
            <div className=" font-poppins_w text-xs text-theme-black">Pending</div>
              <div className="font-poppins_cf text-xs text-theme-grey mt-1">18</div>
            </div>
          
        </div>
      </div>
    </Card>
  );
};

export default TotalQueryCXO;
