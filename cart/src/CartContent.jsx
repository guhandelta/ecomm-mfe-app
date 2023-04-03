import React, { useState, useEffect } from 'react';

import { login, jwt } from './cart'
import Login from './Login';

export default function CartContent(){
    const [token, setToken] = useState("")

  return (
    <div>
        <div></div>
        JWT: {token}
        <Login />
    </div>
  )
}
