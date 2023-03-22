import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Button} from "semantic-ui-react";
import bcrypt from 'bcryptjs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function EditProfile({ updateUser, user }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/profile')
    }

    // state for form --> bring in currentUser state
    const initialState = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        phone: user.phone,
        user_image: user.user_image,
        password: "",
        tennis_level: user.tennis_level,
        play_preference: user.play_preference,
        court_preference: user.court_preference,
        year_started: user.year_started,
        bio: user.bio
    };
    const [formData, setFormData] = useState(initialState);
    const [passwordMatch, setPasswordMatch] = useState(false);

    // helper functions for input
    // const handleChange = (e) => {
    //     setFormData({...formData, [e.target.name]: e.target.value});
    //     if (e.target.name === 'password') {
    //         setPasswordMatch(e.target.value === user.password)
    //     }
    // }

    const handleChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (e.target.name === 'password') {
            const result = await bcrypt.compare(e.target.value, user.password_digest)
            setPasswordMatch(result);
            };
    }

    // handle edit with fetch PATCH request
        const handleSubmit = (e) => {
        e.preventDefault()
        if(passwordMatch) {
            fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(obj => updateUser(obj))
            .then(() => {
                alert('Your profile has been updated.')
                navigate('/profile')
            })
        } else {
            alert('Please type in your current password to continue.')
        }
    }

    const handleDeleteClick = (e) => {
        console.log('deleted')
        if(passwordMatch) {
            e.preventDefault()
            fetch(`/users/${user.id}`, {
                method: 'DELETE'
            })
            // .then(res => res.json())
            .then(updateUser(null))
            .then(alert("Your account has been deleted."))
            .then(navigate('/signup'))
        } else {
            alert('Please type in your current password to continue.')
        }
    }

    // make bio box bigger
    // have a way to actually see / copy paste the bio? or click the field and then editing is allowed?

    return (
        <div>
            <h1>Edit Profile</h1>
            <button onClick={handleBackClick}>back to profile</button>
            <div id="signup-form">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name: </label>
                    <input id="first-name" name="first_name" type="text" placeholder={user.first_name} onChange={handleChange}/>
                    <label htmlFor="last_name">Last Name: </label>
                    <input id="last_name" name="last_name" type="text" placeholder={user.last_name} onChange={handleChange}/>
                    <label htmlFor="email">Email: </label>
                    <input id="email" name="email" type="text" placeholder={user.email} onChange={handleChange}/>
                    {/* <PhoneInput name="phone" placeholder="phone number" defaultCountry="US"
                    value={value} onChange={setValue}
                    /> */}
                    <label htmlFor="phone">Phone: </label>
                    <input id="phone" name="phone" type="text" placeholder={user.phone} onChange={handleChange} />
                    <label htmlFor="age">Age: </label>
                    <input id="age" name="age" type="number" min="18" max="100" placeholder={user.age} onChange={handleChange}/>
                    {/* <p>Profile Picture</p><input name="profile_picture" type="file" placeholder="profile picture"/> */}
                    <label htmlFor="user_image">Profile Picture URL: </label>
                    <input id="user_image" name="user_image" type="text" placeholder={user.user_image} onChange={handleChange}/>
                    <label htmlFor="tennis_level_select">Tennis Level: </label>
                    <select id="tennis_level-select" name="tennis_level" type="select" placeholder={user.tennis_level} onChange={handleChange}>
                        <option selected disabled hidden>{user.tennis_level}</option>
                        <option value="1.5">1.5</option>
                        <option value="2.0">2.0</option>
                        <option value="2.5">2.5</option>
                        <option value="3.0">3.0</option>
                        <option value="3.5">3.5</option>
                        <option value="4.0">4.0</option>
                        <option value="4.5">4.5</option>
                    </select>
                    <label htmlFor="play_preference_select">Play Preference: </label>
                    <select id="play_preference_select" name="court_preference" type="select" placeholder={user.play_preference} onChange={handleChange}>
                        <option selected disabled hidden>{user.play_preference}</option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                        <option value="Singles and Doubles">Singles and Doubles</option>
                    </select>
                    <label htmlFor="court_preference_select">Court Preference: </label>
                    <select id="court_preference_select" name="court_preference" type="select" placeholder={user.court_preference} onChange={handleChange}>
                        <option selected disabled hidden>{user.court_preference}</option>
                        <option value="hard">hard</option>
                        <option value="clay">clay</option>
                        <option value="grass">grass</option>
                        <option value="hard and clay">hard and clay</option>
                        <option value="hard and grass">hard and grass</option>
                        <option value="clay and grass">clay and grass</option>
                        <option value="all surfaces">all surfaces</option>
                    </select>
                    <label htmlFor="year_started">Year Started: </label>
                    <input id="year_started" name="year_started" type="number" min="1950" max="2023" placeholder={user.year_started} onChange={handleChange}/>
                    <label htmlFor="bio">Bio: </label>
                    <input id="bio" name="bio" type="text" placeholder={user.bio} onChange={handleChange}/>
                    <label htmlFor="password">Confirm Password: </label>
                    <input id="password" name="password" type="password" placeholder={user.password} onChange={handleChange} required/>
                    {!passwordMatch && (<p style={{ color: "red" }}>Enter current password to save changes.</p>)}
                    <input type="submit" value="save" />
                </form>
                <Popup trigger={<Button inverted color='red'>Delete Account</Button>} modal nested>
                    {
                        close => (
                            <div className="modal">
                                <div className="content">
                                    Are you sure you want to delete your account?
                                    <Button inverted color='red' onClick={handleDeleteClick}>Yes, delete.</Button>
                                    <Button inverted color='blue' onClick={() => close()}>Nevermind, don't delete</Button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
        </div>
    )
}
{/* <Popup trigger = {reservationDate >= currentDate ? <Button inverted color='red'>Cancel</Button> : null} modal nested>
{
    close => (
        <div className="modal">
            <div className="content">
                Are you sure you want to cancel this reservation?
                <Button inverted color='blue' onClick=
                    {() => close()}>
                    Nevermind, don't cancel
                </Button>
                <Button inverted color='red' onClick={() => handleCancelClick(res.id)}>
                    Yes, Cancel
                </Button>
            </div>
        </div>
    )
}
</Popup> */}