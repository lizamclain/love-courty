import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    // state for form
    const initialState = {
        email: '',
        password: ''
    };
    const [formState, setFormState] = useState(initialState);

    const handleSignupBtnClick = () => {
        navigate('/signup')
    }

    // helper functions for input
    const handleChange = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    }

    // handle submit with fetch POST request
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formState)
    }

    return (
        <div>
            <p>Don't have an account?</p>
            <button onClick={handleSignupBtnClick}>Signup</button>
            <h1>Login</h1>
            <div id="login-form">
                <form className="form" onSubmit={handleSubmit}>
                    <input name="email" type="text" placeholder="email" onChange={handleChange}/>
                    <input name="password" type="password" placeholder="password" onChange={handleChange}/>
                    <input type="submit" value="login" />
                    {/* <button>login</button> */}
                </form>
            </div>
        </div>
    )
}
