import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import Card from "@mui/material/Card";
import { IC_ARROW_RIGHT } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
interface ExecutedTestProps {
  title: string;
  dashboardData?: {
    data: {
      chartData: {
        executedTestResultPass: number;
        executedTestResultFail: number;
        executedTestResultTotal: number;
      };
    };
  };
}

const ExecutedTest: React.FC<ExecutedTestProps> = ({ title, dashboardData }) => {
  const navigate = useNavigate();
  const pieData = dashboardData
    ? [
        {
          color: "#1BB24E",
          range: "Success",
          value:70,
        },
        {
          color: "#F43E30",
          range: "Fail",
          value:30,
        },
      ]
    : [];
    const gotoDetails=()=>{
      navigate('/testresultHub')
    }
  return (
    <Card variant="outlined" className="flex w-full flex-col justify-between p-4 shadow-lg">
      <div className="flex justify-between">
      <div>
      <div className="font-poppins_cf text-base text-theme-black">
          {title}
        </div>
        <div className="text-[10px] text-black font-poppins_cf">(Executed)</div>
      </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-between ">
          <div className="flex flex-col gap-1">
            <div className="font-poppins_cf  text-2xl h-6 text-theme-black">
              {pieData[0]?.value}%
            </div>
            <div className=" font-poppins_cf text-xs  font-normal text-theme-grey">
              Executed Testcases
            </div>
            <IC_ARROW_RIGHT className="cursor-pointer" onClick={()=>gotoDetails()}/>
          </div>
          <div className="flex gap-2 mt-3">
            {pieData?.map((data, index) => (
              <div className="flex items-center gap-2" key={index}>
                <div className="h-2 w-5" style={{ backgroundColor: data.color }}></div>
                <div className="font-poppins_cf text-xs text-theme-grey">{data.range}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="h-20 w-20">
            <PieChart
            lineWidth={40}
              animate={true}
              animationDuration={500}
              labelPosition={50}
              data={pieData}
              label={(props) => `${props.dataEntry.value}%`}
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

export default ExecutedTest;
