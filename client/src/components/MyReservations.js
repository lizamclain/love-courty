import React, { useState, useEffect } from "react";
import Menu from './Menu';
import { Card } from "semantic-ui-react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import ReservationCard from './ReservationCard'

export default function MyReservations({updateUser, setUser, user}) {
    const [resFuture, setResFuture] = useState([])
    const [resPast, setResPast] = useState([])
    const [resToday, setResToday] = useState([])
    const [errors, setErrors] = useState([])
    const [cancelPopup, setCancelPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)

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

    // console.log(resToday)

    const handleCancelClick = (id) => {
        fetch(`/reservations/${id}`,{
            method: 'DELETE',
        })
        .then(() => {
            setResFuture(resFuture.filter(res => res.id !== id))
            setResToday(resToday.filter(res => res.id !== id))
            // alert('You cancelled your reservation.')
            setCancelPopup(true)
            console.log(`cancelled ${id}`)
        })
    }

    const handleEdit = (updatedRes) => {
        console.log(`edit`)
            const updatedTodayReservations = resToday.map((reservation) =>
                reservation.id === updatedRes.id ? updatedRes : reservation
            );
            setResToday(updatedTodayReservations);
            // console.log(updatedTodayReservations)
            setEditPopup(true);
    }

    const resTodayCardsList = resToday.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
            handleEdit={handleEdit}
            user={user}
        />
    )

    const resUpcomingCardsList = resFuture.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
            handleEdit={handleEdit}
            user={user}
        />
    )

    const resPastCardsList = resPast.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            user={user}
        />
    )

    return (
        <div class="mx-3">
            <Menu updateUser={updateUser}></Menu>
            <Popup open={cancelPopup}>You successfully cancelled your reservation.</Popup>
            <Popup open={editPopup}>You successfully edited your reservation.</Popup>
            <h2>Today's Reservations</h2>
            {resTodayCardsList.length === 0 ? <h4><em>You have no  reservations today.</em></h4> : <Card.Group>{resTodayCardsList}</Card.Group>}
            <h2>Upcoming Reservations</h2>
            {resUpcomingCardsList.length !== 0 ? <Card.Group>{resUpcomingCardsList}</Card.Group> : <h4><em>You have no upcoming reservations.</em></h4>}
            <h2>Past Reservations</h2>
            {resPastCardsList.length !== 0 ? <Card.Group>{resPastCardsList}</Card.Group> : <h4><em>You have no old reservations.</em></h4>}
        </div>
    )
}