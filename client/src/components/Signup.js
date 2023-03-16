import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Signup({updateUser}) {
    const navigate = useNavigate();
    const [value, setValue] = useState()
    const [errors, setErrors] = useState([])

    // state for form
    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        age: 0,
        user_image: '',
        password: '',
        tennis_level: 0,
        play_preference: '',
        court_preference: '',
        year_started: 0,
        bio: ''
    };
    const [formData, setFormData] = useState(initialState);

    const handleLoginBtnClick = () => {
        navigate('/login')
    }

    // helper functions for input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    // handle submit with fetch POST request
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(console.log(formData))
        .then(res => {
            if(res.ok) {
                res.json().then(obj => {
                    updateUser(obj)
                    navigate('/home')
                })
            } else {
                // add json errors
                res.json().then(json => setErrors(json.errors))
                .then(alert(errors))
                .then(console.log(errors))
                //errors are sometimes one step behind
            }
        })
    }

    // add required to forms later
    // add validation errors
    // add tool tip for tennis levels
    // make bio box look prettier
    // add password confirmation + validation

    return (
        <div>
            <p>Already have an account?</p>
            <button onClick={handleLoginBtnClick}>Login</button>
            <h1>Signup</h1>
            <div id="signup-form">
                <form className="form" onSubmit={handleSubmit}>
                    <label class="required" for="first_name">First Name: </label>
                    <input id="first_name" name="first_name" type="text" placeholder="first_name" onChange={handleChange} value={formData.first_name} required/>
                    <label class="required" for="last_name">Last Name: </label>
                    <input id="last_name" name="last_name" type="text" placeholder="last_name" onChange={handleChange} value={formData.last_name} required/>
                    <label class="required" for="email">Email: </label>
                    <input id="email" name="email" type="text" placeholder="email" onChange={handleChange} value={formData.email} required/>
                    {/* <PhoneInput name="phone" placeholder="phone number" defaultCountry="US"
                    value={value} onChange={setValue}
                    /> */}
                    <label class="required" for="phone">Phone: </label>
                    <input id="phone" name="phone" type="text" placeholder="phone" onChange={handleChange} value={formData.phone} required/>
                    <label class="required" for="age">Age: </label>
                    <input id="age" name="age" type="number" placeholder="age" onChange={handleChange} value={formData.age} required/>
                    <label class="required" for="password">Password: </label>
                    <input id="password" name="password" type="password" placeholder="password" onChange={handleChange} value={formData.password} required/>
                    <label class="required" for="confirm_password">Confirm Password: </label>
                    <input id="confirm_password" name="confirm_password" type="password" placeholder="confirm password" onChange={handleChange} value={formData.password} required/>
                    {/* <p>Profile Picture</p><input name="profile_picture" type="file" placeholder="profile picture"/> */}
                    <input name="user_image" type="text" placeholder="profile picture url" onChange={handleChange} value={formData.user_image}/>
                    <select name="tennis_level" type="select" placeholder="tennis_level" onChange={handleChange} >
                        <option selected disabled hidden>Choose Your Tennis Level</option>
                        <option value="1.5">1.5</option>
                        <option value="2.0">2.0</option>
                        <option value="2.5">2.5</option>
                        <option value="3.0">3.0</option>
                        <option value="3.5">3.5</option>
                        <option value="4.0">4.0</option>
                        <option value="4.5">4.5</option>
                    </select>
                    <select name="play_preference" type="select" placeholder="play_preference" onChange={handleChange} >
                        <option selected disabled hidden>Choose Your Play Preference</option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                        <option value="Singles and Doubles">Singles and Doubles</option>
                    </select>
                    <select name="court_preference" type="select" placeholder="court_preference" onChange={handleChange} >
                        <option selected disabled hidden>Choose Your Court Preference</option>
                        <option value="hard">hard</option>
                        <option value="clay">clay</option>
                        <option value="grass">grass</option>
                        <option value="hard and clay">hard and clay</option>
                        <option value="hard and grass">hard and grass</option>
                        <option value="clay and grass">clay and grass</option>
                        <option value="all surfaces">all surfaces</option>
                    </select>
                    <input name="year_started" type="number" placeholder="year you started" onChange={handleChange} value={formData.year_started}/>
                    <input name="bio" type="text" placeholder="tell us about yourself" onChange={handleChange} value={formData.bio}/>
                    <input type="submit" value="signup" />
                    <p id="required-text">* required fields</p>
                </form>
            </div>
        </div>
    )
}
