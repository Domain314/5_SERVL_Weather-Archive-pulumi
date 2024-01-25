import React, { useState, useMemo } from 'react';

const TimeSlider = ({ data, sliderChange, chosenDate, sliderValue }) => {

    const timeLabels = useMemo(() => {
        const chosen = new Date(chosenDate);

        const times = data.reduce((acc, item) => {
            const date = new Date(item.datetime);

            // Compare the year, month, and day
            if (date.getFullYear() === chosen.getFullYear() &&
                date.getMonth() === chosen.getMonth() &&
                date.getDate() === chosen.getDate()) {
                // Format the time and add to accumulator
                acc.push(`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`);
            }

            return acc;
        }, []);

        return [...new Set(times)].sort(); // Sort and remove duplicates
    }, [data, chosenDate]);

    // Handle slider change
    const handleSliderChange = (e) => {
        sliderChange(parseInt(e.target.value, 10));
    };

    return (
        <div className="">
            <input
                type="range"
                min="0"
                max={timeLabels.length - 1}
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-sky-900/50 rounded-full appearance-none cursor-pointer dark:bg-sky-200/50"
            />
            <div className="flex justify-between mx-auto mt-2">
                {timeLabels.map((time, index) => (
                    <span key={index} className={`select-none ${index === sliderValue ? 'text-sky-500 font-bold text-xl' : 'text-sky-200 text-sm'}`}>
                        {time}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TimeSlider;
