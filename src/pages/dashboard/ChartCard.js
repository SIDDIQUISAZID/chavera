import * as React from "react";
import Chart from "./Chart";


export default function ChartCard({ width, height, data, title, selectedMonth, handleMonthChange, barColor, barSize }) {
    
  return (
    <Chart
      width={width}
      height={height}
      data={data}
      title={title}
      selectedMonth={selectedMonth}
      handleMonthChange={handleMonthChange}
      barColor={barColor}
      barSize={barSize}
    />
  );
}

