import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card , Button , Icon , Label , Image , Container, Modal } from "semantic-ui-react";

export default function ParkCard({park, setParkId}) {
    const navigate = useNavigate();

    const handleParkClick = () => {
        setParkId(park.id)
        navigate(`/parks/${park.id}`)
        // console.log(park.id)
    }
    return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{park.name} ⭐️{park.avg_rating}</Card.Header>
                    <Card.Meta>{park.neighborhood} | {park.open_time} - {park.close_time}
                    </Card.Meta>
                    <Image src={park.park_image} alt={park.name}/>
                    <Card.Content>
                        Court Type: {park.court_type} | Lights: {park.lights} | {park.number_of_courts} courts
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name="money bill alternate outline"/>${park.price_per_hour} per hour
                    </Card.Content>
                    <Card.Content extra>
                        <a href={park.directions} target="_blank">
                            <Icon name="map outline"/>
                            Directions
                        </a>
                    </Card.Content>
                    <Button inverted color='green' onClick={handleParkClick}>
                        Go to Park
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}