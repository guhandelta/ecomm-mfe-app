import React, { useState, useEffect } from 'react';
// Requires an initial value and emits the current value to new subscribers
import { BehaviorSubject } from "rxjs";

const API_SERVER = "http://localhost:8080";

// Updates the subscribers with an update about any addition/change/deletion of values
export const jwt = new BehaviorSubject(null);
export const cart = new BehaviorSubject(null);

// Eg:
// jwt.value() would give the value of the jwt at that moment
/* jwt.subscribe(token => console.log(token)) => will be called everytime a new value goes into the
JWT, jwt.next(newValue) can be used to give the JWT a new value*/

export const getCart = () =>
    fetch(`${API_SERVER}/cart`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt.value}` // simple get call with the JWT value added in the req
        },
    })
        .then(res => res.json())
        .then(res =>{
            // setting the value of the cart using cart.next()
            cart.next(res);
            // return the contents of the cart  
            return res;
        })

export const addToCart = (id) => 
    fetch(`${API_SERVER}/cart`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt.value}` // simple get call with the JWT value added in the req
        },
        body: JSON.stringify({ id }),
    })  // response hold the contents of the cart
        .then(res => res.json())
        .then(() =>{ 
            getCart();
        });

export const clearCart = () => 
    fetch(`${API_SERVER}/cart`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt.value}` // simple get call with the JWT value added in the req
        },
        body: JSON.stringify({ id }),
    })  // response hold the contents of the cart
        .then(res => res.json())
        .then(() =>{ 
            getCart();
        });
    
export const login = (username, password) => 
    fetch(`${API_SERVER}/auth/login`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
    })
    // Assuming everything will work good, so no validations/exception handling is done here
    .then(res => res.json())
    .then(data => {
        // Add the access token received in the response fromm the server when user logs in
        // access_token is the key holding the JWT, in the response, which is added to the JWT
        jwt.next(data.access_token);
        // Get the cart once the user logs in, just to make sure it's upto date
        getCart();
        return data.access_token;
    });

export function useLoggedin(){
    const [loggedIn, setLoggedIn] = useState(!!jwt.value);   
    // !! will corece the value to a boolean 
    useEffect(()=>{
        // Set the current value of the logged in to the current value of the JWT
        setLoggedIn(!!jwt.value);
        return jwt.subscribe(c=>{
            setLoggedIn(!!jwt.value);
        })
    },[])
    return loggedIn;
}