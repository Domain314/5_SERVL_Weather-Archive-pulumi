import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data }) => {
    return (
        <LineChart
            width={700}
            height={400}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="2 4" stroke="#0ea5e9" />
            <XAxis dataKey="timestamp" stroke="#0ea5e9" />
            <YAxis stroke="#bae6fd" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="humidity" stroke="#10b981" animationDuration={3000} activeDot={{
                r: 8,              // Radius
                fill: '#bae6fd',    // Background color sky-200
                stroke: '#0ea5e9',     // Border color sky-500
                strokeWidth: 2,    // Border width
                opacity: 0.8,      // Opacity
            }} />
            <Line type="monotone" dataKey="temperature" stroke="#f59e0b" animationDuration={3000} activeDot={{
                r: 8,              // Radius
                fill: '#bae6fd',    // Background color sky-200
                stroke: '#0ea5e9',     // Border color sky-500
                strokeWidth: 2,    // Border width
                opacity: 0.8,      // Opacity
            }} />
            <Line type="monotone" dataKey="airPressure" stroke="#8b5cf6" animationDuration={3000} activeDot={{
                r: 8,              // Radius
                fill: '#bae6fd',    // Background color sky-200
                stroke: '#0ea5e9',     // Border color sky-500
                strokeWidth: 2,    // Border width
                opacity: 0.8,      // Opacity
            }} />
        </LineChart>
    );
};

export default Chart;
