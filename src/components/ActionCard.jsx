import React from 'react'

const ActionCard = ({ title, description }) => {
  return (
    <div>

    <button className="bg-white p-6 rounded-xl border border-gray-200 card-hover text-left">
      <p className="font-medium text-gray-900 mb-1">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </button>

    </div>
  )
}

export default ActionCard