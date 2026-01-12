import React from 'react'

const ActionCard = ({ title, description }) => {
  return (
    <div>
      <button className="
        bg-white 
        p-4 sm:p-5 md:p-6 
        rounded-xl 
        border border-gray-200 
        card-hover 
        text-left 
        w-full
      ">
        <p className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
          {title}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          {description}
        </p>
      </button>
    </div>
  )
}

export default ActionCard
