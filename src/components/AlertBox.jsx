import React from 'react'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

export default function AlertBox({ type, children, onClose }) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-700',
      icon: <FaCheckCircle className="text-green-400" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: <FaExclamationCircle className="text-red-400" />
    }
  }

  const currentStyle = styles[type] || styles.success

  return (
    <div className={`${currentStyle.bg} border ${currentStyle.border} ${currentStyle.text} px-4 py-3 rounded relative mb-4`} role="alert">
      <span className="block sm:inline flex items-center gap-2">
        {currentStyle.icon}
        {children}
      </span>
      {onClose && (
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={onClose}>
          <svg className="fill-current h-6 w-6 text-gray-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </span>
      )}
    </div>
  )
}