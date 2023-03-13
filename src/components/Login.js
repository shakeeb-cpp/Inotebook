import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    // useNavigate hook is used for redirect (redirect mean when a user loggedIn then after that which page will be shown to that user)
    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json)

        if (json.SUCCESS) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert('Logged In Successfully', 'success', 'check-circle-fill');
            navigate('/');
        } else {
            props.showAlert(json.error, 'danger', 'exclamation-triangle-fill');
        }

    }


    return (
        <div className='mt-5'>
            <div className='container pt-5 text-center'>
                <h1 className='pb-1 px-5 pt-0 bg-black bg-opacity-25 rounded' id='heading'>Login to your Account</h1>
            </div>
            <form onSubmit={handleSubmit} className='pt-5'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' value={credentials.email} onChange={onChange} className="form-control text-bg-dark" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text-white text-opacity-75">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control text-bg-dark" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
