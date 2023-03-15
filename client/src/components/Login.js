import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({ updateUser }) {
    const navigate = useNavigate();

    // state for form
    const initialState = {
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState([])

    const handleSignupBtnClick = () => {
        navigate('/signup')
    }

    // handle submit with fetch POST request
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    updateUser(user)
                    navigate('/home')
                })
            } else {
                res.json().then(json => setErrors(json.errors))
                alert(errors)
                // make errors more specific
            }
        })
    }

    // helper functions for input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
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
