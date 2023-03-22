import React from 'react'
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';

export default function Profile({updateUser, user}) {
    const navigate = useNavigate();

    const handleEditBtnClick = () => {
        navigate('/profile/edit')
    }

    return (
        <div>
            <NavBar updateUser={updateUser}></NavBar>
            <h2>{user.first_name}'s Profile</h2>
            <img src={user.user_image} alt="profile picture"/>
            <h3>{user.email}</h3>
            <h3>{user.phone}</h3>
            <h3>{user.tennis_level} Tennis Player</h3>
            <h3>Prefers to play {user.play_preference}</h3>
            <h3>Prefers to play on {user.court_preference} courts</h3>
            <h4>Age: {user.age}</h4>
            <h4>Been hitting since {user.year_started}</h4>
            <p>Bio: {user.bio}</p>
            <button onClick={handleEditBtnClick}>Edit Profile</button>
        </div>
    )
}