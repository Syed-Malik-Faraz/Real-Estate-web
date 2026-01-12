import React from "react";

const Metric = ({ title, value, animate }) => {
  return (
    <div className="w-full">
      <div
        className={`p-3 sm:p-4 md:p-5 lg:p-6 bg-white rounded-xl border shadow-sm transition-all duration-500 
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <p className="text-xs sm:text-sm md:text-base text-gray-500 truncate">
          {title}
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Metric;
