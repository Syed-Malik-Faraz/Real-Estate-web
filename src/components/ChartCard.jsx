import React from 'react'

const ChartCard = ({ title, chartRef }) => {
  return (
    <div>

    <div className="bg-white p-6 rounded-xl">
      <h4 className="font-semibold mb-4">{title}</h4>
      <div ref={chartRef} className="h-80" />
    </div>


    </div>
  )
}

export default ChartCard