import React from 'react'

const Modal = ({ title, children, onClose }) => {
  return (
    <div>

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>


    </div>
  )
}

export default Modal