import React from 'react'

import MiniCart from 'cart/MiniCart'
import Login from 'cart/Login'

export default function Header(){
  return (
    <div className="p-5 bg-blue-700 text-black text-2xl font-bold">
        <div className="flex">
          <div className="flex-grow">Golden Threads</div>
          <div className="flex-end relative">
            <MiniCart />
            <Login />
          </div>
        </div>
    </div>
  )
}