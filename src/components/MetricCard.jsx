import React from 'react'

const MetricCard = ({ title, value, growth, bg, color, icon }) => {
  return (
    <div>
      <div className="p-4 sm:p-5 md:p-6 rounded-xl border border-gray-200 card-hover">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className={`p-2 sm:p-3 rounded-lg ${bg}`}>
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {icon}
            </svg>
          </div>

          <span className="text-xs sm:text-sm text-green-600 font-medium">
            {growth}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600">
          {title}
        </p>

        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  )
}

export default MetricCard
