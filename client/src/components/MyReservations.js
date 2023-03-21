import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import { Card } from "semantic-ui-react";


import ReservationCard from './ReservationCard'

export default function MyReservations({updateUser, setUser, user}) {
    const [resFuture, setResFuture] = useState([])
    const [resPast, setResPast] = useState([])
    const [resToday, setResToday] = useState([])
    const [errors, setErrors] = useState([])

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
        .then(() => {
            setResFuture(resFuture.filter(res => res.id !== id))
            setResToday(resToday.filter(res => res.id !== id))
            alert('You cancelled your reservation.')
            console.log(`cancelled ${id}`)
        })
    }

    // initial state for new reservation form
    const initialState = {
            user_id: user.id,
            park_id: res.park_id,
            date: res.date,
            time: res.time,
            duration: res.duration
    }

    const [formData, setFormData] = useState(initialState)

    const handleSubmit = (e, id) => {
        e.preventDefault();
        console.log('submitted');
        fetch(`/reservations/${id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((r) => {
            if (r.ok) {
                return r.json().then((data) => {
                const updatedTodayReservations = resToday.map((reservation) =>
                    reservation.id === data.id ? data : reservation
                );
                setResToday(updatedTodayReservations);
                alert('Your reservation has been updated.');
                });
            } else {
                r.json().then((json) => setErrors(json.errors));
            }
        });
        console.log(formData);
        // console.log(user.id)
    };

    const handleEditClick = (id) => {
        console.log(`edit ${id}`)
    }

    const resTodayCardsList = resToday.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            formData={formData}
            errors={errors}
            user={user}
        />
    )

    const resUpcomingCardsList = resFuture.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            formData={formData}
            errors={errors}
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