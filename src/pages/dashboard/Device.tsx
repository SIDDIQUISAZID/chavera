import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import Card from "@mui/material/Card";
import { IC_ARROW_RIGHT } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
interface DeviceProps {
  title: string;
  dashboardData?: {
    data: {
      deviceTotal:number;
      deviceFree:number;
      deviceInUse:number;
    };
  };
}

const Device: React.FC<DeviceProps> = ({ title, dashboardData }) => {
  const navigate=useNavigate()
  const pieData = dashboardData
    ? [
        {
          color: "#D3DBFA",
          range: "Free",
          value:30
        },
        {
          color: "#EC1944",
          range: "In Use",
          value:70
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
      color: "#D3DBFA",
    },
  ];

  const gotoDeviceList=()=>{
    navigate('/deviceHub/deviceList')

  }

  return (
    <Card variant="outlined" className="flex w-full flex-col justify-between p-4 shadow-lg">
      <div className="flex justify-between">
        <div className="font-poppins_cf text-base text-theme-black">
          {title}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
        <div className="flex flex-col gap-1">
          <div className="font-poppins_cf  h-6 text-2xl font-semibold text-theme-black">
            {dashboardData ? dashboardData.data?.deviceTotal : "Loading..."}
          </div>
          <div className=" font-poppins_cf text-xs font-normal text-theme-grey">
            Total Devices
          </div>
          <IC_ARROW_RIGHT className="cursor-pointer" onClick={()=>gotoDeviceList()} />
          
        </div>
        <div className="flex gap-2 mt-2">
            {genderData?.map((data, index) => (
              <div className="flex items-center gap-2" key={index}>
                <div
                  className={
                    index !== 0
                      ? "bg-theme-grey h-2 w-5"
                      : "h-2 w-5 bg-gradient-to-b from-theme-gradientTop to-theme-gradientBottom"
                  }
                ></div>
                <div className="font-poppins_cf text-xs text-theme-grey">{data.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="h-20 w-20">
            <PieChart
              animate={true}
              animationDuration={500}
              data={pieData}
              lineWidth={40}
              label={(props) => `${props.dataEntry.value}`}
              labelStyle={{
                fontSize: 12,
                fontFamily: "Poppins W",
                color: "#ffffff",
                fontStyle: "normal",
                textAlign: "center",
                fill: "white",
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Device;
