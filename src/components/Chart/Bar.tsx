import React from 'react';
import { ChartOptions, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Plugin } from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';

export interface BarProps {
    options: ChartOptions<'bar'>;
    data: ChartData<'bar'>;
    plugins?: Plugin<"bar", AnyObject>[] | undefined;
}
const BarChart = ({ options, data,plugins }: BarProps) => {
    return <Bar options={options} data={data} plugins={plugins} />
}
export default BarChart;

