import React from 'react'
import NavBar from './NavBar';

export default function MyReservations({updateUser}) {
    return (
        <div>
            <NavBar updateUser={updateUser}></NavBar>
            <h1>My Reservations</h1>
        </div>
    )
}