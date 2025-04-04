import React from 'react'

const Loader = () => {
  return (
<div className="h-screen flex items-center justify-center ">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-4 border-white-500 border-solid rounded-full animate-spin"></div>
    </div>
  )
}

export default Loader