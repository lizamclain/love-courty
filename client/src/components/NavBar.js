import React from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBar({updateUser}) {
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
        <nav>
            <h1>Love-Courty</h1>
            <NavLink
                to="/home"
            >home
            </NavLink>
            <NavLink
                to="/parks"
            >browse parks
            </NavLink>
            <NavLink
                to="/profile/reservations"
            >my reservations
            </NavLink>
            <NavLink
                to="/profile"
            >my profile
            </NavLink>
            <NavLink
                to='/'
                onClick={handleLogout}
            >logout
            </NavLink>
        </nav>
    )
}