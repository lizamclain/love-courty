import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Signup() {
    const navigate = useNavigate();
    const [value, setValue] = useState()

    // state for form

    const handleLoginBtnClick = () => {
        navigate('/login')
    }

    // helper functions for input

    // handle submit with fetch POST request

    // add required to forms later
    // add tool tip for tennis levels
    // make bio box look prettier

    return (
        <div>
            <p>Already have an account?</p>
            <button onClick={handleLoginBtnClick}>Login</button>
            <h1>Signup</h1>
            <div id="signup-form">
                <form className="form">
                    <input name="first_name" type="text" placeholder="first_name"/>
                    <input name="last_name" type="text" placeholder="last_name"/>
                    <input name="email" type="text" placeholder="email"/>
                    <PhoneInput name="phone" placeholder="phone number" defaultCountry="US" value={value} onChange={setValue}/>
                    <input name="age" type="number" placeholder="age"/>
                    <input name="password" type="password" placeholder="password"/>
                    {/* <p>Profile Picture</p><input name="profile_picture" type="file" placeholder="profile picture"/> */}
                    <input name="profile_picture" type="text" placeholder="profile picture url"/>
                    <select name="tennis_level" type="select" placeholder="tennis_level">
                        <option selected disabled hidden>Choose Your Tennis Level</option>
                        <option value="1.0">1.5</option>
                        <option value="1.0">2.0</option>
                        <option value="1.0">2.5</option>
                        <option value="1.0">3.0</option>
                        <option value="1.0">3.5</option>
                        <option value="1.0">4.0</option>
                        <option value="1.0">4.5</option>
                    </select>
                    <select name="play_preference" type="select" placeholder="play_preference">
                        <option selected disabled hidden>Choose Your Play Preference</option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                        <option value="Singles and Doubles">Singles and Doubles</option>
                    </select>
                    <select name="court_preference" type="select" placeholder="court_preference">
                        <option selected disabled hidden>Choose Your Court Preference</option>
                        <option value="hard">hard</option>
                        <option value="clay">clay</option>
                        <option value="grass">grass</option>
                        <option value="hard and clay">hard and clay</option>
                        <option value="hard and grass">hard and grass</option>
                        <option value="clay and grass">clay and grass</option>
                        <option value="all surfaces">all surfaces</option>
                    </select>
                    <input name="year_started" type="number" placeholder="year you started"/>
                    <input name="bio" type="text" placeholder="tell us about yourself"/>
                    <input type="submit" value="signup" />
                </form>
            </div>
        </div>
    )
}
