import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmpassword: '' });

    // useNavigate hook is used for redirect (redirect mean when a user loggedIn then after that which page will be shown to that user)
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log("signup", json)

        if (json.SUCCESS) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert('Your Account has been Created Successfully', 'success', 'check-circle-fill');
            navigate('/');
        } else {
            props.showAlert(json.error, 'danger', 'exclamation-triangle-fill');
        }



    }



    return (
        <div className='my-5' onSubmit={handleSubmit}>
            <div className='container pt-5 text-center'>
                <h1 className='pb-1 px-5 pt-0 bg-black bg-opacity-25 rounded' id='heading'>Create your Account</h1>
            </div>
            <form className='pt-3'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" name='name' onChange={onChange} className="form-control text-bg-dark" id="name" aria-describedby="nameHelp" />
                    <div id="nameHelp" className="form-text text-white text-opacity-75">Enter your name to create your account.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' onChange={onChange} className="form-control text-bg-dark" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text text-white text-opacity-75">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' onChange={onChange} className="form-control text-bg-dark" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confrrm Password</label>
                    <input type="password" name='confirmpassword' onChange={onChange} className="form-control text-bg-dark" id="confirmpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </div>
    )
}

export default Signup
