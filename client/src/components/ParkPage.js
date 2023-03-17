import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react'
import { Button } from "semantic-ui-react";

export default function ParkPage({parkId, updateUser, user}) {
    const navigate = useNavigate()
    const [park, setPark] = useState({available_times: []})
    const [userReservations, setUserReservations] = useState(user.my_reservations)
    const [selectedRating, setSelectedRating] = useState(0)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`${parkId}`)
        // fetch(`1`)
        .then(res => res.json())
        .then(data => setPark(data))
    }, [])

    // console.log(park.available_times)
    // console.log(park.id)
    // console.log(user.my_reservations)
    // console.log(userReservations)

    const initialState = {
        user_id: user.id,
        park_id: parkId,
        date: '',
        time: '',
        duration: ''
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleClick = (value) => {
        setFormData({ ...formData, time: value });
    }

    const renderTimes = park.available_times.map((time) => {
        const isSelected = time === formData.time

        return (
            <Button
                type="button"
                name="time"
                value={time}
                inverted color='blue'
                onClick={() => handleClick(time)}
                className={isSelected ? "selected" : ""}
            >
                {time >= 12 ? time === 12 ? '12:00 PM' : `${time - 12}:00 PM` : `${time}:00 AM`}
            </Button>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(data => setUserReservations([...userReservations, data])).then(navigate('/profile/reservations'))
            } else {
                res.json().then(json => setErrors(json.errors))
            }
        }
        )
        console.log(formData)
        // state is one step behind. have to refresh. it's because of how i call my reservations and reservations list i think. might need to pull everything up to App (fetch on my reservations and the stuff here)
    }

    const handleRating = (e) => {
        setSelectedRating(e.target.value)
        console.log(selectedRating)
    }

    return (
        <Container>
            <NavBar updateUser={updateUser}/>
            <h1>{park.name} ⭐️{park.avg_rating}</h1>
            Rate this Park:
            <form class="rating" onSubmit={handleRating}>
                <label>
                    <input type="radio" name="stars" value="1" />
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="2" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="3" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="4" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
                <label>
                    <input type="radio" name="stars" value="5" />
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                    <span class="icon">★</span>
                </label>
            </form>

            <a href={park.directions} target="_blank"><h2 >{park.address}</h2></a>
            <h3>{park.neighborhood} | {park.open_time > 12 ? park.open_time - 12 : park.open_time} a.m. - {park.close_time > 12 ? park.close_time - 12 : park.close_time} p.m | ${park.price_per_hour} per hour</h3>
            <h3>Court Type: {park.court_type}</h3>
            <h3>Lights: {park.lights ? "Yes" : "No"}</h3>
            <h3>{park.number_of_courts} courts</h3>
            <img src={park.park_image} alt={park.name}/>
            <br/>
            <h1>Reserve a Court</h1>
            <form id="new-reservation" onSubmit={handleSubmit}>
                <label htmlFor="date">Pick a date: </label>
                <input id="date" name="date" type="date" onChange={handleChange}></input>
                <label htmlFor="time">Pick a Time: </label>
                {/* <input id="time" name="time" type="number" min="10" max="20" onChange={handleChange}></input> */}
                {renderTimes}
                <label htmlFor="duration">How many hours would you like to reserve? </label>
                <input id="duration" name="duration" type="number" min="1" max="3" onChange={handleChange}></input>
                <Button inverted color='green'>Reserve</Button>
            </form>
            {errors ? <h3>{errors}</h3> : null}
        </Container>
    )
}