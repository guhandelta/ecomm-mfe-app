import React, { useState } from 'react';

import { login, useLoggedIn } from './cart'
import { useEffect } from 'react';

export default function Login(){

    const loggedIn = useLoggedIn(); // get the logged in state
    const [showLogin, setShowLogin] = useState(false);

    const [username, setUsername] = useState("Sally");
    const [password, setPassword] = useState("123");

    // useEffect(()=> login("maria", "123"), [])

    // if logged in, don't display anything
    if(loggedIn) return null;
  return (
    <>
        <span onClick={() => setShowLogin(!showLogin)}>
            <i className="ri-fingerprint-line text-2xl" id="showLogin"></i>
        </span>
        {showLogin &&(
            <div 
                className="absolute p-5 border-4 border-blue-500"
                style={{
                    width: 300,
                    top: "2rem",
                    background: "white"
                    // left: -250,
                }} 
            >
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={e => setUsername(e.target.value)} 
                    className="border text-sm border-gray-400 p-2 rounded-md w-full" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={e => setUsername(e.target.value)} 
                    className="border text-sm border-gray-400 p-2 rounded-md w-full mt-3" 
                />
                <button 
                    className="bg-green-900 text-white py-2 px-5 rounded-md text-sm mt-5" 
                    id="loginBtn"
                    onClick={() => login(username, password)}
                >
                    Login
                </button>
            </div>
        )}
    </>
  )
}
