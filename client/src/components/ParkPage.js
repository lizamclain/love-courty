import React, {useState, useEffect} from 'react'
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react'

export default function ParkPage({parkId, updateUser}) {
    const [park, setPark] = useState([])

    useEffect(() => {
        fetch(`${parkId}`)
        // fetch(`1`)
        .then(res => res.json())
        .then(data => setPark(data))
    }, [])

    return (
        <Container>
            <NavBar updateUser={updateUser}/>
            <h1>{park.name} ⭐️{park.avg_rating}</h1>
            <a href={park.directions} target="_blank"><h2 >{park.address}</h2></a>
            <h3>{park.neighborhood} | {park.open_time > 12 ? park.open_time - 12 : park.open_time} a.m. - {park.close_time > 12 ? park.close_time - 12 : park.close_time} p.m | ${park.price_per_hour} per hour</h3>
            <h3>Court Type: {park.court_type}</h3>
            <h3>Lights: {park.lights ? "Yes" : "No"}</h3>
            <h3>{park.number_of_courts} courts</h3>
            <img src={park.park_image} alt={park.name}/>
            <br/>
            <h1>Open Reservations</h1>
        </Container>
    )
}