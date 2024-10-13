import { BarChart } from "../../components/Chart";
import { ChartOptions, ScriptableContext } from "chart.js";
import Card from "@mui/material/Card";
import { Select } from "../../components/Select";
import { IV_NEXT, IV_PREVIOUS } from "../../assets/icons";
import { PerformanceTime } from "../../features/dashboard/dashboardAPI";
import React, { useState, useMemo } from "react";

import { useGetDashboardPerformanceQuery } from "../../features/dashboard/dashboardAPI";
import moment from "moment";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { el } from "date-fns/locale";
/* istanbul ignore next */
const options: ChartOptions<"bar"> = {
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "No. of device",
        // font: { weight: "semi-bold" },
        align: "center",
      },
      ticks: {
        stepSize: 10,

        callback: (total) => total,
        //   format: {
        //     style: 'percent'
        // }
      },
    },
    x: {
      title: {
        display: true,
        text: "2024",
        align: "center",
      },
      stacked: true,

      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
      color: "black",
      align: "end",
      anchor: "end",
    },
  },

  parsing: {
    xAxisKey: "dateFilter",
    yAxisKey: "total",
  },
};

const titleOfBar = ["Success", "Fail"];
const statusFilter = [
  { value: "Month", label: "Monthly" },
  { value: "Week", label: "Weekly" },
];

const ChartSection = ({ title, moSMS }: { title: string; moSMS: number }) => {
  const [current, setCurrent] = useState(0);

  const [selected, setSelected] = useState({
    value: "Month",
    label: "Monthly",
  });


  
  const [label, setLabel] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const params = useMemo(() => {
    return {
      dataType: moSMS,
      from:
        selected.value === "Month"
          ? moment(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() - current,
                1
              )
            ).format("YYYY-MM-DD")
          : moment().clone().weekday(current).format("YYYY-MM-DD"),
      to:
        selected.value === "Month"
          ? moment(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth() - current + 1,
                0
              )
            ).format("YYYY-MM-DD")
          : moment()
              .clone()
              .weekday(6 + current)
              .format("YYYY-MM-DD"),
      filterType: selected.value,
    };
  }, [current, selected.value]);

  const { data } = useGetDashboardPerformanceQuery({ params });





  const onPrevBTN=()=>{
    if( selected?.value==="Month"){
      setCurrent(current + 1)
    }else{
   
      setCurrent(current - 7)
    }

  }

  const nextBTN = () => {

   

    if (selected?.value === "Month") {
      setCurrent(current - 1);
    } else {
     
      setCurrent(current + 7);
    }
  };

  return (
    <Card
      variant="outlined"
      className=" flex  w-full flex-col  justify-between p-2 "
    >
      <div className="flex items-center justify-between">
        <div className="font-poppins_w text-base text-theme-black">{title}</div>

        <div className="flex items-center gap-3">
          {titleOfBar.map((item, index) => (
            <div>
              <div className="flex items-center gap-2">
                <div
                  className={
                    index === 0
                      ? "h-2 w-5 bg-gradient-to-b from-theme-gradientTop to-theme-gradientBottom"
                      : "h-2 w-5 bg-theme-border"
                  }
                ></div>
                <div className="font-poppins_cf text-xs text-theme-grey">
                  {item}
                </div>
              </div>
            </div>
          ))}
          <Select
            options={statusFilter}
            value={selected}
            onChange={(selectedOption) => {
              setCurrent(0);
              if (selectedOption?.value == "Month") {
                setLabel([
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]);
              } else {
                setLabel([
                  "Sun",
                  "Mun",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                 
                ]);
              }
              setSelected(selectedOption as any);
            }}
            placeholder="Monthly"
            wrapperAttr={{ className: "h-[20px] w-[120px] my-1" }}
            //clearable
            required
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <IV_PREVIOUS
          className=" cursor-pointer"
          onClick={() =>onPrevBTN() }
        />
        <div className=" h-64 w-36   sm:w-full">
          <BarChart
            plugins={[ChartDataLabels]}
            options={options}
            data={{
              labels: label,

              datasets: [
                {
                  label: `Pass`,
                
                  //@ts-ignore
                  data: data?.data?.kpiData?.toSorted((a, b) => a.dateFilter - b.dateFilter)?.map((data) => data?.success) || [],
                  backgroundColor: (context: ScriptableContext<"bar">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(27, 178, 78, 1)");
                    gradient.addColorStop(0.6, "rgba(63, 231, 57, 1)");

                    return gradient;
                  },
                  borderColor: "#000",

                  barPercentage: 0.32,
                  //borderRadius: 10,
                },
                {
                  label: `Fail`,
//@ts-ignore
                  data: data?.data?.kpiData?.toSorted((a, b) => a.dateFilter - b.dateFilter)?.map((data) => data?.failure) || [],

                  backgroundColor: (context: ScriptableContext<"bar">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(244, 62, 48, 1)");
                 
                    return gradient;
                  },

                  borderColor: "#000",
                  barPercentage: 0.32,
                },
              ],
            }}
          />
        </div>
        {current !== 0 && (
          <IV_NEXT
            className=" cursor-pointer"
            onClick={() => nextBTN()}
          />
        )}
      </div>
    </Card>
  );
};
export default ChartSection;
