import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
    const navigate = useNavigate();

    const handleLoginBtnClick = () => {
        navigate('/login')
    }
    const handleSignupBtnClick = () => {
        navigate('/signup')
    }
    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={handleLoginBtnClick}>Login</button>
            <button onClick={handleSignupBtnClick}>Signup</button>
        </div>
    )
}
