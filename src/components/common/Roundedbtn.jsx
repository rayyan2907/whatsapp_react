import React from 'react'

export default function Roundedbtn({icon , onClick}) {
  return (
    <button className='text-[#8796a1] w-12 h-12 bg-transparent border-transparent text-xl p-5 rounded-full hover:bg-[#3c454c]' onClick={onClick}>
        {icon}
    </button>
  )
}
