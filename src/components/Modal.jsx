import React from 'react'

const Modal = ({ title, children, onClose }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-lg sm:text-xl"
            >
              ✕
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
