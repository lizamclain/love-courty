import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    // state for form

    const handleSignupBtnClick = () => {
        navigate('/signup')
    }
    // helper functions for input

    // handle submit with fetch POST request

    return (
        <div>
            <p>Don't have an account?</p>
            <button onClick={handleSignupBtnClick}>Signup</button>
            <h1>Login</h1>
            <div id="login-form">
                <form className="form">
                    <input name="email" type="text" placeholder="email"></input>
                    <input name="password" type="password" placeholder="password"></input>
                    <input type="submit" value="signup" />
                    {/* <button>login</button> */}
                </form>
            </div>
        </div>
    )
}
