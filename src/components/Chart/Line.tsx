import React from 'react';
import { ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';

export interface BarProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}
const LineChart = ({ options, data }: BarProps) => {
    return <Line options={options} data={data} />
}
export default LineChart;
