import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NavBar() {

    // want to add dropdown from profile pic that includes settings and logout

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
                to="/profile/:id/reservations"
            >my reservations
            </NavLink>
            <NavLink
                to="/profile/:id"
            >my profile
            </NavLink>
            <NavLink
                to='/'
            >logout
            </NavLink>
        </nav>
    )
}