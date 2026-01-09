import React from 'react'

const Metric = ({ title, value, animate }) => {
  return (
    <div>

    <div
      className={`p-6 bg-white rounded-xl border transition-all duration-500 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>

    </div>
  )
}

export default Metric