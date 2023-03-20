import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import { Card } from "semantic-ui-react";

import ReservationCard from './ReservationCard'

export default function MyReservations({updateUser, setUser, user}) {
    const navigate = useNavigate()
    const [resFuture, setResFuture] = useState([])
    const [resPast, setResPast] = useState([])
    const [resToday, setResToday] = useState([])

    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [])

    useEffect(() => {
        setResToday(user.reservations_today)
        setResFuture(user.upcoming_reservations)
        setResPast(user.past_reservations)
    }, [user])

    const handleCancelClick = (id) => {
        fetch(`/reservations/${id}`,{
            method: 'DELETE',
        })
        .then(resFuture.filter(res => res.id !== id))
        .then(resToday.filter(res => res.id !== id))
        .then(alert('You cancelled your reservation.'))
        .then(navigate('/profile/reservations'))
        console.log(`cancelled ${id}`)
    }
    // state is behind. only show when the page is refreshed

    const resTodayCardsList = resToday.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
        />
    )

    const resUpcomingCardsList = resFuture.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
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