import ChartSection from "./ChartSection";
import Card from "@mui/material/Card";
import { useState } from "react";
import PreferenceSelector from "./PreferenceSelector";
import { useGetDashboardPerformanceQuery } from "../../features/dashboard/dashboardAPI";
import moment from "moment";

import QueryBarGraph from "./QueryBarGraph";




export default function BarChartContainerCXO() {
  const [index, setSelectedTab] = useState(0);




  console.log(moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("yyyy-MM-DD"))

  const { data } = useGetDashboardPerformanceQuery({
    params: {
      dataType: 5,
      from: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("yyyy-MM-DD"),
      to: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)).format("yyyy-MM-DD"),
      filterType: "month",
    },
  });
  const onClickTab = (position) => {
    setSelectedTab(position);
  };

  return (
    <div>
    
      <Card variant="outlined" className=" flex  w-full flex-col p-4 ">
        <div className="grid grid-cols-1 gap-2  lg:grid-cols-2">
          <ChartSection
            moSMS={5}
            title="Installation"
          />
          <QueryBarGraph title="Queries" />
         
        </div>
      </Card>
    </div>
  );
}
