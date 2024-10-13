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

const DeviceCXO: React.FC<DeviceProps> = ({ title, dashboardData }) => {
  const pieData = dashboardData
    ? [
        {
          color: "#606060",
          range: "Free",
          value:
            dashboardData.data?.chartData?.deviceFree !== null
              ? dashboardData.data?.chartData?.deviceFree
              : 0,
        },
        {
          color: "#E45842",
          range: "In Use",
          value:
            dashboardData.data?.chartData?.deviceInUse !== null
              ? dashboardData.data?.chartData?.deviceInUse
              : 0,
        },
      ]
    : [];

  const genderData = [
    {
      value: "In Use",
      color: "#EC1944",
    },
    {
      value: "Free",
      color: "#606060",
    },
  ];

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
          2,050
          </div>
          <div className="mb-2 font-poppins_cf text-xs font-normal text-theme-grey">
            Total Devices
          </div>
        </div>
        <div className="h-2 w-full border-t border-gray-300"></div>
        <div className="flex items-center justify-between gap-6">
          <div className=" items-center gap-4">
            <div className=" font-poppins_w text-xs text-theme-black">
              Android
            </div>
            <div className="font-poppins_cf text-xs text-theme-grey mt-1">200</div>
          </div>

          
            <div className=" items-center gap-4">
            <div className=" font-poppins_w text-xs text-theme-black">IOS</div>
              <div className="font-poppins_cf text-xs text-theme-grey mt-1">50</div>
            </div>
          
        </div>
      </div>
    </Card>
  );
};

export default DeviceCXO;
