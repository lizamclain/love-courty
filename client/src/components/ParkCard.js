import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Modal }from 'react-bootstrap';

export default function ParkCard({park, setParkId}) {
    const navigate = useNavigate();

    const handleParkClick = () => {
        setParkId(park.id)
        navigate(`/parks/${park.id}`)
        // console.log(park.id)
    }
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                    <Card.Title>{park.name} ⭐️{park.avg_rating}</Card.Title>
                    <Card.Text>{park.neighborhood} | {park.open_time} - {park.close_time}
                    </Card.Text>
                    <Card.Img src={park.park_image} alt={park.name}/>
                    <Card.Text>
                        Court Type: {park.court_type} | Lights: {park.lights} | {park.number_of_courts} courts
                        {/* <Icon name="money bill alternate outline"/> */}
                        ${park.price_per_hour} per hour

                        <a href={park.directions} target="_blank">
                            {/* <Icon name="map outline"/> */}
                            Directions
                        </a>
                    </Card.Text>
                    <Button inverted color='green' onClick={handleParkClick}>
                        Go to Park
                    </Button>
            </Card>
        </div>
    )
}