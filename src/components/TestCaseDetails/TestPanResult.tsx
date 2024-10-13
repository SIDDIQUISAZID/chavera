import { BarChart } from "../../components/Chart";
import { ChartOptions, ScriptableContext } from "chart.js";
import Card from "@mui/material/Card";
import { Select } from "../../components/Select";
import { IV_NEXT, IV_PREVIOUS } from "../../assets/icons";

import ChartDataLabels from "chartjs-plugin-datalabels";
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
      afterDataLimits(scale) {
        scale.max += 10;
      },
    },
    x: {
      title: {
        display: false,
        text: "2024",
        align: "center",
      },
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
      //    font: { size: 12 },
      //     formatter({ value }) {
      //         return value + "%";
      //     },
    },
  },

  parsing: {
    xAxisKey: "density",
    yAxisKey: "value",
  },
};


const colors = [
  "rgba(27, 178, 78, 1)",
  "rgba(236, 25, 68, 1)",
  "rgba(255, 142, 9, 1)",
];

const TestPanResult = ({
  title,
  totalTestPlan,
  totalInProgress,
  totalYetToStart,
  totalCompleted,
}: {
  title: string;
  totalTestPlan: number;
  totalInProgress: number;
  totalYetToStart: number;
  totalCompleted: number;
}) => {
  return (
    <Card className=" flex  w-full flex-col  justify-between p-2 ">
      <div className="font-poppins_w text-base text-theme-black">{title}</div>
      <div className="flex items-center gap-1">
        <div className=" h-64 w-[600px]   ">
          <BarChart
            plugins={[ChartDataLabels]}
            options={options}
            data={{
              // Name of the variables on x-axies for each bar
              labels: ["Completed", "Not Yet started", "In Progress"],
              datasets: [
                {
                  label: "total count/value",
                  data: [totalCompleted, totalYetToStart, totalInProgress],

                  backgroundColor: colors,

                  barPercentage: 0.1,
                  //borderRadius: 10,
                },
              ],
            }}
          />
        </div>

        <div className="font-poppins_w text-xs text-theme-black ">
          Total Test Plan : {totalTestPlan}
        </div>
      </div>
    </Card>
  );
};
export default TestPanResult;
