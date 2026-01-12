import React from 'react'

const InnerPropertyCard = ({ property, onClick }) => {
  return (
    <div>
      <div
        onClick={onClick}
        className="
          bg-white 
          rounded-xl 
          shadow 
          hover:-translate-y-2 
          transition-all 
          cursor-pointer
        "
      >
        <img
          src={property.image || "/placeholder-property.jpg"}
          alt={property.name}
          className="
            h-40 sm:h-44 md:h-48 
            w-full 
            object-cover 
            rounded-lg
          "
        />

        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-semibold">
            {property.name}
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm">
            {property.address}
          </p>

          <div className="flex justify-between mt-3 sm:mt-4">
            <div>
              <p className="text-xs text-gray-500">Units</p>
              <p className="font-bold text-sm sm:text-base">
                {property.units}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Occupancy</p>
              <p className="font-bold text-sm sm:text-base text-green-600">
                {property.occupancyRate}%
              </p>
            </div>
          </div>

          <p className="mt-3 sm:mt-4 font-bold text-base sm:text-lg">
            ${(property.monthlyRevenue / 1000).toFixed(0)}K / month
          </p>
        </div>
      </div>
    </div>
  )
}

export default InnerPropertyCard
