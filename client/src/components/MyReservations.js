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
            {resTodayCardsList.length === 0 ? <h4><em>You have no  reservations today.</em></h4> : <Card.Group>{resTodayCardsList}</Card.Group>}
            <h1>Upcoming Reservations</h1>
            {resUpcomingCardsList.length !== 0 ? <Card.Group>{resUpcomingCardsList}</Card.Group> : <h4><em>You have no upcoming reservations.</em></h4>}
            <h1>Past Reservations</h1>
            {resPastCardsList.length !== 0 ? <Card.Group>{resPastCardsList}</Card.Group> : <h4><em>You have no old reservations.</em></h4>}
        </div>
    )
}