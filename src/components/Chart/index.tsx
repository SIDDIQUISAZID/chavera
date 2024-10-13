
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,

    PointElement,
    LineElement,

    Title,
    Tooltip,
    Legend
);
export * from "./Bar"
export {default as BarChart} from "./Bar"
export {default as LineChart} from "./Line"