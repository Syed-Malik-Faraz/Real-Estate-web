import React from 'react'

const PropertyCard = ({ img, title, revenue, type }) => {
  return (
    <div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-40 sm:h-44 md:h-48 w-full object-cover"
        />

        <div className="p-4 sm:p-5 md:p-6">
          <span className="text-xs sm:text-sm bg-gray-700 text-white px-2 sm:px-3 py-1 rounded-full">
            {type}
          </span>

          <h4 className="text-lg sm:text-xl font-semibold mt-2 sm:mt-3">
            {title}
          </h4>

          <p className="text-xl sm:text-2xl font-bold mt-3 sm:mt-4">
            {revenue}
          </p>

          <p className="text-xs sm:text-sm text-gray-500">
            Monthly Revenue
          </p>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
