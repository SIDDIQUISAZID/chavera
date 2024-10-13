import ChartSection from "./ChartSection";
import Card from "@mui/material/Card";
import DeviceOS from "./DeviceOS";
import ScheduleTestcases from "./ScheduleTestcases";

import {
  useGetDashboardPerformanceQuery,
} from "../../features/dashboard/dashboardAPI";
export default function CXOContainer() {
  const { data } = useGetDashboardPerformanceQuery();
  return (
    <div
  
    className=" flex  w-full flex-col"
  >
    <div className=" flex flex-col ">
      <div className="flex flex-col gap-2 lg:flex-row">
        <ChartSection moSMS={
               data?.data?.callPerformance?.moVoiceCall} title="MO Voice Call Success Rate" />
        <DeviceOS title="Device" />
      
      </div>
      <ScheduleTestcases/>
     
    </div>
    </div>
  );
}