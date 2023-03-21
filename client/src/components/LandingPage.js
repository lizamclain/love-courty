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
            <h1>Welcome to Love-Courty! 🎾</h1>
            <h3><em>Your go-to app to reserve a court in your area</em></h3>
            <button onClick={handleLoginBtnClick}>Login</button>
            <button onClick={handleSignupBtnClick}>Signup</button>
        </div>
    )
}
