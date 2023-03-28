import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import Menu from './Menu';
import News from './News'
import ReservationCard from './ReservationCard'

import ParkCard from './ParkCard'

export default function Home({updateUser, user, setParkId}) {
    const navigate = useNavigate();
    const [resToday, setResToday] = useState([])
    const [topParks, setTopParks] = useState([])

    useEffect(() => {
        setResToday(user.reservations_today)
    }, [])

    const handleCancelClick = (id) => {
        fetch(`/reservations/${id}`,{
            method: 'DELETE',
        })
        .then(() => {
            setResToday(resToday.filter(res => res.id !== id))
            alert('You cancelled your reservation.')
            console.log(`cancelled ${id}`)
        })
    }

    const handleEditClick = (id) => {
        console.log(`edit ${id}`)
    }

    const resTodayCardsList = resToday.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
        />
    )

    useEffect(() => {
        fetch('/top_rated')
        .then(res => res.json())
        .then(data => setTopParks(data))
    }, [])

    const topParksCardsList = topParks.map(park =>
        <ParkCard
            key={park.id}
            park={park}
            setParkId={setParkId}
        />
    )

    return (
        user !== null ?
            <div class="mx-3">
                <Menu updateUser={updateUser}/>
                <h1>Welcome, {user.first_name}!</h1>
                <h2>Today's Reservations</h2>
                        {resTodayCardsList.length === 0 ?
                        <h4><em>You have no reservations today.</em></h4> :
                        <div className="cards">{resTodayCardsList}</div>}
                <br />
                <News/>
                <h2>Top Rated Parks</h2>
                    <div className="cards">{topParksCardsList}</div>
            </div>
            :
            <div className="not-loggedin">
                <p>You are not logged in!</p>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/signup')}>Signup</button>
            </div>
            // to get the above to show, comment the logic out in App.js with if(!user). not sure how to get the same message to appear on all of the pages without copy/pasting
    )
}
