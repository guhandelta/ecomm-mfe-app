import { BehaviorSubject } from "rxjs";
// Requires an initial value and emits the current value to new subscribers

const API_SERVER = "http://localhost:8080";

export const jwt = new BehaviorSubject(null);

// Eg:
// jwt.value() would give the value of the jwt at that moment
/* jwt.subscribe(token => console.log(token)) => will be called everytime a new value goes into the
JWT, jwt.next(newValue) can be used to give the JWT a new value*/

export const login = (username, password) => 
    fetch(`${API_SERVER}/auth/login`, {
        method: 'POST',
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
            // Add teh access token received in the response fromm the server when user logs in
            // access_token is the key holding the JWT, in the response, which is added to the JWT
            jwt.next(data.access_token);
            // getCart();
            return data.access_token;
        })