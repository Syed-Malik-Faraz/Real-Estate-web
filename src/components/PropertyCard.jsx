import React from 'react'

const PropertyCard = ({ img, title, revenue, type }) => {
  return (
    <div>
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <img src={img} alt={title} className="h-48 w-full object-cover" />
      <div className="p-6">
        <span className="text-sm bg-gray-700 text-white px-3 py-1 rounded-full">
          {type}
        </span>
        <h4 className="text-xl font-semibold mt-3">{title}</h4>
        <p className="text-2xl font-bold mt-4">{revenue}</p>
        <p className="text-sm text-gray-500">Monthly Revenue</p>
      </div>
    </div>
 

    </div>
  )
}

export default PropertyCard