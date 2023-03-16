import React, { useState, useEffect } from "react";
import NavBar from './NavBar';

import ReservationList from './ReservationList'

export default function MyReservations({updateUser, user}) {
    const [myRes, setMyRes] = useState([])

    useEffect(() => {
        setMyRes(user.my_reservations)
    }, [])
    console.log(myRes)

    // build the logic for "past reservations"

    return (
        <div>
            <NavBar updateUser={updateUser}></NavBar>
            <h1>Upcoming Reservations</h1>
            <ReservationList myRes={myRes}/>
            <h1>Past Reservations</h1>
            {/* <ReservationList myRes={myRes}/> */}
        </div>
    )
}