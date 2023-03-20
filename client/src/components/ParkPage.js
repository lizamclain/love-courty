import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react'
import { Button } from "semantic-ui-react";
import ReactStars from "react-rating-stars-component";

export default function ParkPage({parkId, updateUser, user}) {
    const navigate = useNavigate()
    const [park, setPark] = useState({available_times: []})
    const [userReservations, setUserReservations] = useState(user.my_reservations)
    const [ratingValue, setRatingValue] = useState(0)
    const [selectedRating, setSelectedRating] = useState(0)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`${parkId}`)
        .then(res => res.json())
        .then(data => setPark(data))
    }, [])

    // initial state for new reservation form
    const initialState = {
        user_id: user.id,
        park_id: parkId,
        date: '',
        time: '',
        duration: ''
    }

    const [formData, setFormData] = useState(initialState)

    // helper functions for new reservation form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleClick = (value) => {
        setFormData({ ...formData, time: value });
    }

    // function to render available park times
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

    // POST request for new reservation
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
    }

    // initial state for new rating
    const initialRating = {
        user_id: user.id,
        park_id: parkId,
        rating: 0
    }

    const [ratingData, setRatingData] = useState(initialRating)

    const handleRating = (e) => {
        setRatingData({ ...ratingData, [e.target.name]: parseInt(e.target.value) })
        // setSelectedRating(e.target.value)
        e.target.checked = true
        console.log(ratingData.rating)
        console.log(ratingData)
        // setSelectedRating(rating)
    }

    // useEffect(() => {
    //     console.log(selectedRating);
    //     handleNewRating()
    // }, [selectedRating]);

    const handleNewRating= (e) => {
        e.preventDefault()
        fetch('/ratings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(ratingData)
        })
        .then(res => {
            if(res.ok) {
                res.json().then(setRatingData(ratingData))
            } else {
                res.json().then(json => alert(json.errors))
            }
        })
        // .then(console.log(ratingData))
    }

    // console.log(ratingData)

    return (
        <Container>
            <NavBar updateUser={updateUser}/>
            <h1>{park.name} ⭐️{park.avg_rating}</h1>
            Rate this Park:
            <form className="radio" onSubmit={handleNewRating}>
                <label>
                <input type="radio" name="rating" value="1" checked={false} onChange={handleRating}/>1
                </label>
                <label>
                <input type="radio" name="rating" value="2" checked={false} onChange={handleRating}/>2
                </label>
                <label>
                <input type="radio" name="rating" value="3" checked={false} onChange={handleRating}/>3
                </label>
                <label>
                <input type="radio" name="rating" value="4" checked={false} onChange={handleRating}/>4
                </label>
                <label>
                <input type="radio" name="rating" value="5" checked={false} onChange={handleRating}/>5
                </label>
                <button type="submit">Rate</button>
            </form>
                {/* <ReactStars
                    count={5}
                    onChange={handleRating}
                    size={24}
                    activeColor="#ffd700"
                /> */}
            {/* <form class="rating" onSubmit={handleRating}>
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
                <div>
                    <button type="submit">Rate</button>
                </div>
            {/* </form> */}

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