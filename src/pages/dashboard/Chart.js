import React from "react";
import Card from "@mui/material/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CustomLegend = () => null;

const Chart = ({
  width,
  height,
  data,
  title,
  selectedMonth,
  handleMonthChange,
  barColor,
  barSize,
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <Card className=" shadow-lg">
      <div className="flex w-full items-center justify-between p-4 font-poppins_cf ">
        <div className="flex items-center">
          <h2
            className="text-[#000000 ] mr-4 font-poppins_cf text-base font-medium"
          >
            {title}
          </h2>
          <div className="ml-4 flex items-center">
            <div
              className="mr-2 h-4 w-4"
              style={{ backgroundColor: barColor }}
            ></div>
            <span className="mr-2 font-normal text-xs font-poppins_cf">Pass</span>
          </div>
          <div className="ml-4 flex items-center">
            <div
              className="mr-2 h-4 w-4"
              style={{ backgroundColor: "#cccccc" }}
            ></div>
            <span className="mr-2 font-normal text-xs font-poppins_cf">Fail</span>
          </div>
        </div>
        <div>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="rounded border font-poppins_cf font-normal text-xs border-gray-300 p-[0.3rem]"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
     
      <div className="font-poppins_cf font-normal text-xs p-2" >
        <BarChart  width={450} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: `No of devices`,
              angle: -90,
              dy: 20,
              dx: -20,
            }}
          />
          <Tooltip />
          <Legend content={CustomLegend} />
          <Bar dataKey="pass" fill={barColor} barSize={barSize} />
          <Bar dataKey="fail" fill="#cccccc" barSize={barSize} />
        </BarChart>
      </div>
    
     
    </Card>
  );
};

export default Chart;
