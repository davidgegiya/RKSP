import React, {useState, useEffect} from "react";
import {redirect} from "react-router-dom";
import { useSignIn } from 'react-auth-kit'
import axios, {AxiosError} from 'axios';


export default function RegisterForm(){

    const signIn = useSignIn();
    const [usernameInput, setUsername] = useState('');
    const [passwordInput, setPassword] = useState('');
    const headers = { headers: {'Content-Type': 'application/json'}}

    const onSubmit = async () => {
        try {
            const jsonBody = {
                username: usernameInput,
                password: passwordInput
            };
            const response = await axios.post(
                "http://localhost:3002/register",
                jsonBody,
                headers
            );

            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { username: usernameInput, role: 'user' },
            });
            window.location.replace("http://localhost:3000/chat");
        } catch (err) {
            if (err && err instanceof AxiosError)
                console.log(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err.message);
        }
    };




    return(
        <div>
            <h1>Register</h1>
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" id="inputUsername" />
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" id="inputPassword"/>
            <button onClick={onSubmit} className="btn btn-primary">Submit</button>
        </div>
    );
}