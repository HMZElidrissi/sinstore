'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const data = {
    labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ],
    datasets: [
        {
            label: 'This year',
            data: [65, 59, 80, 81, 56, 55, 60, 49, 112, 72, 52, 43],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true,
            pointStyle: false,
        },
        {
            label: 'Last year',
            data: [28, 48, 40, 19, 86, 27, 90, 102, 52, 74, 77, 32],
            borderColor: 'rgb(234, 179, 8)',
            backgroundColor: 'rgba(234, 179, 8, 0.1)',
            tension: 0.4,
            fill: true,
            pointStyle: false,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    plugins: {
        legend: {
            display: true,
            position: 'top' as const,
            labels: {
                boxWidth: 8,
                usePointStyle: true,
                pointStyle: 'circle',
            },
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                color: '#94a3b8',
                font: {
                    size: 12,
                },
            },
        },
        y: {
            border: {
                display: false,
                dash: [4, 4],
            },
            grid: {
                color: '#e2e8f0',
            },
            ticks: {
                color: '#94a3b8',
                font: {
                    size: 12,
                },
            },
        },
    },
};

export function Overview() {
    return (
        <div className="h-[350px] w-full">
            <Line options={options as any} data={data as any} />
        </div>
    );
}
