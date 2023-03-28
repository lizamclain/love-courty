import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card, Button }from 'react-bootstrap';
import { BsMap, BsLightbulb } from 'react-icons/bs';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';

export default function ParkCard({park, setParkId}) {
    const navigate = useNavigate();

    const handleParkClick = () => {
        setParkId(park.id)
        navigate(`/parks/${park.id}`)
        // console.log(park.id)
    }
    return (
        <div>
            <Card id="card-border" style={{ width: '18rem' }}>
                    <Card.Title>{park.name} ⭐️{park.avg_rating}</Card.Title>
                    <Card.Subtitle>{park.neighborhood} | {park.open_time} - {park.close_time}
                    </Card.Subtitle>
                    <Card.Img src={park.park_image} alt={park.name} variant='top'/>
                    <Card.Text>
                        <GiRunningShoe></GiRunningShoe>
                        Court Type: {park.court_type} | {park.number_of_courts} courts
                    </Card.Text>
                    <Card.Text>
                        <BsLightbulb></BsLightbulb>
                        Lights: {park.lights}
                    </Card.Text>
                    <Card.Text>
                        <FaRegMoneyBillAlt></FaRegMoneyBillAlt>
                        ${park.price_per_hour} per hour
                    </Card.Text>
                    <Card.Text>
                            <BsMap></BsMap>
                            <i class="bi bi-map"></i>
                        <a href={park.directions} target="_blank">Directions
                        </a>
                    </Card.Text>
                    <Button id='sign-save-btn' onClick={handleParkClick}>
                        Go to Park
                    </Button>
            </Card>
        </div>
    )
}