import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'

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
            }
        })
    }

    // helper functions for input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    return (
        <div class="mx-3">
            <p id="login-label">Don't have an account?</p>
            <Button id='regular-btn' onClick={handleSignupBtnClick}>Signup</Button>
            <br />
            <br />
            <h1>Login</h1>
            <Form id="login-form" onSubmit={handleSubmit}>
                <Form.Group class="form-outline w-50" >
                    <Form.Label id="login-label">Email</Form.Label>
                    <Form.Control name="email" type="text" placeholder="enter email" onChange={handleChange}/>
                </Form.Group>
                <br />
                <Form.Group class="form-outline w-50">
                    <Form.Label id="login-label">Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="enter password" onChange={handleChange}/>
                </Form.Group>
                <br />
                <Form.Group className="mb-3">
                    <Button id='sign-save-btn' type="submit">login</Button>
                </Form.Group>
            </Form>
            {errors ? <h3>{errors}</h3> : null}
        </div>
    )
}
