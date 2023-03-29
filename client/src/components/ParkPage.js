import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Menu from './Menu';
import { Container } from 'semantic-ui-react'
import { Button, Form, Image } from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";

export default function ParkPage({parkId, updateUser, user}) {
    const navigate = useNavigate()
    const [park, setPark] = useState({available_times: []}, {ratings: []})
    const [userReservations, setUserReservations] = useState(user.my_reservations)
    const [errors, setErrors] = useState([])
    // const [rated, setRated] = useState(false)

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
                id={isSelected ? 'regular-btn-selected' : 'regular-btn'}
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
        console.log(ratingData.rating)
        console.log(ratingData)
        // setSelectedRating(rating)
    }

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
                .then(alert(`You've rated ${park.name} a ${ratingData.rating}.`))
                // .then(setRated(true))
            } else {
                res.json().then(json => alert(json.errors))
            }
        })
    }

    console.log(park.ratings)
    // console.log(park.ratings.find(rating => rating.user_id === user.id))

    return (
        <Container>
            <Menu updateUser={updateUser}/>
            <h1>{park.name} ⭐️{park.avg_rating}</h1>
            {(1 + 1 !== 2) ? <h3>You've already rated this park</h3> :
            // <h3>Rate this Park:</h3>
            <Form className="radio" id='rating-form' onSubmit={handleNewRating}>
                <Form.Label>
                <input type="radio" name="rating" value="1" checked={ratingData.rating === 1} onChange={handleRating}/>1
                </Form.Label>
                <Form.Label>
                <input type="radio" name="rating" value="2" checked={ratingData.rating === 2} onChange={handleRating}/>2
                </Form.Label>
                <Form.Label>
                <input type="radio" name="rating" value="3" checked={ratingData.rating === 3} onChange={handleRating}/>3
                </Form.Label>
                <Form.Label>
                <input type="radio" name="rating" value="4" checked={ratingData.rating === 4} onChange={handleRating}/>4
                </Form.Label>
                <Form.Label>
                <input type="radio" name="rating" value="5" checked={ratingData.rating === 5} onChange={handleRating}/>5
                </Form.Label>
                <Button id='sign-save-btn' type="submit" size='sm'>Rate</Button>
            </Form>
            }
            <br />
                {/* // <ReactStars
                //     count={5}
                //     onChange={handleRating}
                //     size={24}
                //     activeColor="#ffd700"
                // />
            // <form class="rating" onSubmit={handleRating}>
            //     <label>
            //         <input type="radio" name="stars" value="1" />
            //         <span class="icon">★</span>
            //     </label>
            //     <label>
            //         <input type="radio" name="stars" value="2" />
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //     </label>
            //     <label>
            //         <input type="radio" name="stars" value="3" />
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //     </label>
            //     <label>
            //         <input type="radio" name="stars" value="4" />
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //     </label>
            //     <label>
            //         <input type="radio" name="stars" value="5" />
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //         <span class="icon">★</span>
            //     </label>
            //     <div>
            //         <button type="submit">Rate</button>
            //     </div>
            // </form>/ */}
            <div className="park-container">
                <div className="park-details-container">
                    <a id='park-page-link' href={park.directions} target="_blank"><h2 >{park.address}</h2></a>
                    <h3>{park.neighborhood} | {park.open_time > 12 ? park.open_time - 12 : park.open_time} a.m. - {park.close_time > 12 ? park.close_time - 12 : park.close_time} p.m | ${park.price_per_hour} per hour</h3>
                    <h4><b>Court Type:</b> {park.court_type}</h4>
                    <h4><b>Lights:</b> {park.lights ? "Yes" : "No"}</h4>
                    <h4><b>Number of Courts:</b> {park.number_of_courts}</h4>
                    <br/>
                    <Image src={park.park_image} alt={park.name} class='img-fluid'/>
                </div>
            </div>
            <br/>
            <h1>Reserve a Court</h1>
                    <Form id="edit-form" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="date">Pick a date: </Form.Label>
                            <Form.Control id="date" name="date" type="date" style={{ width: '30%' }} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="time">Pick a Time: </Form.Label>
                            <br />
                            {renderTimes}
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="duration">How many hours would you like to reserve? </Form.Label>
                            <Form.Control id="duration" name="duration" type="number" min="1" max="3" style={{ width: '10%' }} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <br />
                        <Button id='sign-save-btn' type='submit'>Reserve</Button>
                    </Form>
            {errors ? <h3>{errors}</h3> : null}
        </Container>
    )
}