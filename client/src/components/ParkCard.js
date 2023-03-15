import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card , Button , Icon , Label , Image , Container, Modal } from "semantic-ui-react";

export default function Park({park}) {
    const navigate = useNavigate();

    const handleParkClick = () => {
        navigate(`/parks/${park.id}`)
    }
    return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{park.name} ⭐️{park.avg_rating}</Card.Header>
                    <Card.Meta>{park.neighborhood} | {park.open_time > 12 ? park.open_time - 12 : park.open_time} a.m. - {park.close_time > 12 ? park.close_time - 12 : park.close_time} p.m
                    </Card.Meta>
                    <Image src={park.park_image} alt={park.name}/>
                    <Card.Content>
                        Court Type: {park.court_type} | Lights: {park.lights ? "Yes" : "No"} | {park.number_of_courts} courts
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