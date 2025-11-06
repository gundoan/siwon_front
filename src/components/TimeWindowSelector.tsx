import React from 'react';
import type { TimeWindow, TimeWindowOption } from '../types';
import { timeWindowOptions } from '../mockData';

interface TimeWindowSelectorProps {
  selectedWindow: TimeWindow;
  onWindowChange: (window: TimeWindow) => void;
}

const TimeWindowSelector: React.FC<TimeWindowSelectorProps> = ({
  selectedWindow,
  onWindowChange,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {timeWindowOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onWindowChange(option.value)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${
              selectedWindow === option.value
                ? 'bg-channel-purple text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeWindowSelector;
