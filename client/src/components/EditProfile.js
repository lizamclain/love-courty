import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

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

    // helper functions for input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    // handle submit with fetch POST request
        const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(obj => updateUser(obj))
        .then(alert('Your profile has been updated.'))
        .then(navigate('/profile'))
        // console.log(formData)
        // console.log(user.id)
    }

    const handleDeleteClick = (e) => {
        console.log('deleted')
        e.preventDefault()
        fetch(`/users/${user.id}`, {
            method: 'DELETE'
        })
        // .then(res => res.json())
        .then(updateUser(null))
        .then(alert("Your account has been deleted."))
        .then(navigate('/signup'))
    }

    // type in password before hitting save?
    // make bio box bigger
    // have a way to actually see / copy paste the bio? or click the field and then editing is allowed?

    return (
        <div>
            <h1>Edit Profile</h1>
            <button onClick={handleBackClick}>back to profile</button>
            <div id="signup-form">
                <form className="form" onSubmit={handleSubmit}>
                    <label for="first_name">First Name: </label>
                    <input id="first-name" name="first_name" type="text" placeholder={user.first_name} onChange={handleChange}/>
                    <label for="last_name">Last Name: </label>
                    <input id="last_name" name="last_name" type="text" placeholder={user.last_name} onChange={handleChange}/>
                    <label for="email">Email: </label>
                    <input id="email" name="email" type="text" placeholder={user.email} onChange={handleChange}/>
                    {/* <PhoneInput name="phone" placeholder="phone number" defaultCountry="US"
                    value={value} onChange={setValue}
                    /> */}
                    <label for="phone">Phone: </label>
                    <input id="phone" name="phone" type="text" placeholder={user.phone} onChange={handleChange} />
                    <label for="age">Age: </label>
                    <input id="age" name="age" type="number" placeholder={user.age} onChange={handleChange}/>
                    {/* <p>Profile Picture</p><input name="profile_picture" type="file" placeholder="profile picture"/> */}
                    <label for="user_image">Profile Picture URL: </label>
                    <input id="user_image" name="user_image" type="text" placeholder={user.user_image} onChange={handleChange}/>
                    <label for="tennis_level_select">Tennis Level: </label>
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
                    <label for="play_preference_select">Play Preference: </label>
                    <select id="play_preference_select" name="court_preference" type="select" placeholder={user.play_preference} onChange={handleChange}>
                        <option selected disabled hidden>{user.play_preference}</option>
                        <option value="Singles">Singles</option>
                        <option value="Doubles">Doubles</option>
                        <option value="Singles and Doubles">Singles and Doubles</option>
                    </select>
                    <label for="court_preference_select">Court Preference: </label>
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
                    <label for="year_started">Year Started: </label>
                    <input id="year_started" name="year_started" type="number" placeholder={user.year_started} onChange={handleChange}/>
                    <label for="bio">Bio: </label>
                    <input id="bio" name="bio" type="text" placeholder={user.bio} onChange={handleChange}/>
                    <label for="password">Confirm Password: </label>
                    <input id="password" name="password" type="password" placeholder={user.password} onChange={handleChange} required/>
                    <input type="submit" value="save" />
                </form>
                <button onClick={handleDeleteClick}>Delete Account</button>
            </div>
        </div>
    )
}