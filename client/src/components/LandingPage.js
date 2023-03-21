import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "semantic-ui-react";


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
            <Button inverted color='blue' onClick={handleLoginBtnClick}>Login</Button>
            <Button inverted color='blue' onClick={handleSignupBtnClick}>Signup</Button>
        </div>
    )
}
