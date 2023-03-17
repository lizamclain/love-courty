import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import { Card } from "semantic-ui-react";

import ReservationCard from './ReservationCard'

export default function MyReservations({updateUser, user}) {
    // const [myRes, setMyRes] = useState([])
    const [resFuture, setResFuture] = useState([])
    const [resPast, setResPast] = useState([])
    const [resToday, setResToday] = useState([])

    // don't need this anymore - it was the "all reservations fetch"
    // useEffect(() => {
    //     setMyRes(user.my_reservations)
    // }, [])

    useEffect(() => {
        setResToday(user.reservations_today)
    }, [])

    const resTodayCardsList = resToday.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
        />
    )

    useEffect(() => {
        setResFuture(user.upcoming_reservations)
    }, [])

    const resUpcomingCardsList = resFuture.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
        />
    )

    useEffect(() => {
        setResPast(user.past_reservations)
    }, [])

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