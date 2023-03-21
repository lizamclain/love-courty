import React, {useState, useEffect} from 'react'
import { Card , Button , Icon } from "semantic-ui-react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ReservationCard({res, handleCancelClick, handleEditClick, handleSubmit, user, errors, setFormData, formData}) {
    const reservationDate = new Date(res.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const [park, setPark] = useState({available_times: []}, {ratings: []})



    useEffect(() => {
        fetch(`/parks/${res.park_id}`)
        .then(res => res.json())
        .then(data => setPark(data))
    }, [])

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

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('submitted')
    //     fetch(`/reservations/${res.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //     .then(r => {
    //         if (r.ok) {
    //             return r.json().then(data => setResToday([...resToday, data])).then(alert('Your reservation has been updated.'))
    //         } else {
    //             r.json().then(json => setErrors(json.errors))
    //         }
    //     }
    //     )
    //     console.log(formData)
    //     console.log(user.id)
    // }



    return (
        <div>
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header>{res.park}</Card.Header>
                        <Card.Content><Icon name="calendar alternate outline"/>Date: {res.date}</Card.Content>
                        <Card.Content><Icon name="clock outline"/>Time: {res.time}</Card.Content>
                        <Card.Content><Icon name="hourglass half"/>Hours Reserved: {res.duration}</Card.Content>
                        <Card.Content>
                            <Icon name="money bill alternate outline"/>Total Price: ${res.cost}</Card.Content>
                        <Card.Content extra>
                            <a href={res.directions} target="_blank">
                                <Icon name="map outline"/>
                                Directions
                            </a>
                        </Card.Content>
                        {reservationDate >= currentDate ? <Button inverted color='red' onClick={() => handleCancelClick(res.id)}>
                            Cancel
                        </Button> : null}
                    </Card.Content>
                    <Popup trigger= {reservationDate >= currentDate ? <Button inverted color='purple' onClick={() => handleEditClick(res.id)}>
                            Edit
                        </Button> : null} modal nested>
                        {
                            close => (
                            <div className='modal'>
                                <div className='content'>
                                Edit Reservation
                                <form id="new-reservation" onSubmit={handleSubmit}>
                                    <label htmlFor="date">Edit date: </label>
                                    <input id="date" name="date" type="date" onChange={handleChange}></input>
                                    <label htmlFor="time">Edit Time: </label>
                                    {/* <input id="time" name="time" type="number" min="10" max="20" onChange={handleChange}></input> */}
                                    {renderTimes}
                                    <label htmlFor="duration">How many hours would you like to reserve? </label>
                                    <input id="duration" name="duration" type="number" min="1" max="3" onChange={handleChange}></input>
                                    <Button type="submit" inverted color='purple'>Save
                                    </Button>
                                </form>
                                {errors ? <h3>{errors}</h3> : null}
                                </div>
                            <div>
                                <Button inverted color='blue' onClick=
                                    {() => close()}>
                                        Exit
                                </Button>
                            </div>
                        </div>
                            )
                        }
                    </Popup>
                </Card>
            </Card.Group>
        </div>
    )
}