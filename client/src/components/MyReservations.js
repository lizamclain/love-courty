import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import { Card } from "semantic-ui-react";

import ReservationCard from './ReservationCard'

export default function MyReservations({updateUser, user}) {
    const [resFuture, setResFuture] = useState([])
    const [resPast, setResPast] = useState([])
    const [resToday, setResToday] = useState([])

    useEffect(() => {
        setResToday(user.reservations_today)
        setResFuture(user.upcoming_reservations)
        setResPast(user.past_reservations)
    }, [user])


    const resTodayCardsList = resToday.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
        />
    )

    const resUpcomingCardsList = resFuture.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
        />
    )

    const resPastCardsList = resPast.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
        />
    )

    return (
        <div>
            <NavBar updateUser={updateUser}></NavBar>
            <h1>Today's Reservations</h1>
            <Card.Group>{resTodayCardsList}</Card.Group>
            <h1>Upcoming Reservations</h1>
            <Card.Group>{resUpcomingCardsList}</Card.Group>
            <h1>Past Reservations</h1>
            <Card.Group>{resPastCardsList}</Card.Group>
        </div>
    )
}