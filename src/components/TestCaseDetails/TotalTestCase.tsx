import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import Card from "@mui/material/Card";
import { useParams, useNavigate } from "react-router-dom";

const genderData = [
  {
    value: "Pass",
    color: "#EC1944",
  },
  {
    value: "In Progress",
    color: "#FF952B",
  },
  {
    value: "Fail",
    color: "#606060",
  },
];

const TotalTestCase = ({
  title,
  totalCounts,
  totalPass,
  totalFails,
}: {
  title: string;
  totalCounts: string;
  totalPass: string;
  totalFails: string;
}) => {
  const { totalInProgress } = useParams();

  const pieData = [
    {
      color: "#EC1944",
      range: "22-29",
      value: (Number(totalPass) / Number(totalCounts)) * 100,
    },
    {
      color: "#FF952B",
      range: "30-39",
      value:  (100-((Number(totalFails) / Number(totalFails)) * 100 +((Number(totalPass) / Number(totalCounts))* 100) )),
    },
    {
      color: "#606060",
      range: "30-39",
      value: (Number(totalFails) / Number(totalCounts)) * 100,
    },
  ];

  return (
    <Card
      variant="outlined"
      className=" flex  w-full flex-col  justify-around p-4 "
    >
      <div className="flex justify-around">
        <div className="font-poppins_cf text-base text-theme-black">
          {title}
        </div>
      </div>
      <div className="  flex items-center justify-between">
        <div className="flex flex-col items-center justify-between">
          <div className="font-poppins_w text-base text-theme-black">
            Total Testcase Count: {totalCounts}
          </div>

          <div className="flex py-4">
            <div className="border-r px-8">
              <div className="font-poppins_cf  text-2xl font-semibold text-theme-black ">
                {(Number(totalPass) / Number(totalCounts)) * 100}%
              </div>

              <div className="mb-2 font-poppins_cf text-xs font-normal text-theme-grey ">
                Success
              </div>
            </div>
            <div className="ml-8 border-r px-8 ">
              <div className="font-poppins_cf  text-2xl font-semibold text-theme-black ">
                {(Number(totalFails) / Number(totalCounts)) * 100}%
              </div>

              <div className="mb-2 font-poppins_cf text-xs font-normal text-theme-grey ">
                Fail
              </div>
            </div>
            <div className=" ml-8 px-8">
              <div className="font-poppins_cf  text-2xl font-semibold text-theme-black  ">
                {(100-((Number(totalFails) / Number(totalFails)) * 100 +((Number(totalPass) / Number(totalCounts))* 100))) }%
              </div>

              <div className="mb-2 font-poppins_cf text-xs font-normal text-theme-grey ">
                InProgress
              </div>
            </div>
          </div>
          <div className="font-poppins_cf text-xs text-theme-blue">
            Execution Time : 13:40
          </div>
        </div>
        <div className="h-24 border-r  border-gray-300 "></div>
        <div className="flex items-center justify-around gap-6">
          <div className="h-20 w-20 ">
            <PieChart
              lineWidth={40}
              animate={true}
              animationDuration={500}
              labelPosition={65}
              data={pieData}
            />
          </div>

          <div>
            {genderData?.map((data, index) => {
              return (
                <div className="flex items-center gap-2">
                  <div
                    className={
                      index != 0
                        ? "h-2 w-5 bg-theme-grey"
                        : " h-2 w-5 bg-gradient-to-b from-theme-gradientTop to-theme-gradientBottom"
                    }
                  ></div>

                  <div className="font-poppins_cf text-xs text-theme-grey">
                    {data.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TotalTestCase;
