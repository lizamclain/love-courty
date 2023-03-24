import React from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Menu({updateUser}) {
    const navigate = useNavigate();

    // want to add dropdown from profile pic that includes settings and logout

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(res => {
            if(res.ok) {
                updateUser(null)
                navigate('/login')
            }
        })
    }

    return (
        <>
            <Navbar id="menu" >
                <Container>
                    <Navbar.Brand id="menu">Love-Courty 🎾</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link id="nav" href="/home">home</Nav.Link>
                        <Nav.Link id="nav" href="/parks">browse parks</Nav.Link>
                        <Nav.Link id="nav" href="/profile/reservations">my reservations</Nav.Link>
                        <Nav.Link id="nav" href="/profile">my profile</Nav.Link>
                        <Nav.Link id="nav" href='/' onClick={handleLogout}>logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}