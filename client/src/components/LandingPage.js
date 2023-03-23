import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from 'react-bootstrap'


export default function LandingPage() {
    const navigate = useNavigate();

    const handleLoginBtnClick = () => {
        navigate('/login')
    }
    const handleSignupBtnClick = () => {
        navigate('/signup')
    }
    return (
        <div class="mx-auto">
            <Stack gap={2}>
                <h1 class="d-flex justify-content-center">Welcome to Love-Courty! 🎾</h1>
                <h3 class="d-flex justify-content-center"><em>Your go-to app to reserve a court in your area</em></h3>
            <Stack gap={2} class="d-flex justify-content-center">
                <Button id='regular-btn' variant="outline-primary" onClick={handleLoginBtnClick}>Login</Button>
                <Button id='regular-btn' onClick={handleSignupBtnClick}>Signup</Button>
            </Stack>
            </Stack>
        </div>
    )
}


