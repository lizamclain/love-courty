import React from 'react'
import { useNavigate } from 'react-router-dom';

import NavBar from './NavBar';

export default function Profile() {
    const navigate = useNavigate();

    const handleEditBtnClick = () => {
        navigate('/profile/:id/edit')
    }

    return (
        <div>
            <NavBar></NavBar>
            <h1>My Profile</h1>
            <button onClick={handleEditBtnClick}>Edit Profile</button>
        </div>
    )
}
