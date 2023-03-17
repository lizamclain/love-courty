import React from 'react'
import { useNavigate } from "react-router-dom";

import { Card , Button , Icon , Label , Image , Container, Modal } from "semantic-ui-react";

export default function Reservation({res}) {
    const navigate = useNavigate()
    const handleCancelClick = () => {
        fetch(`/reservations/${res.id}`,{
            method: 'DELETE',
        })
        .then(navigate('/profile/reservations'))
        console.log(`cancelled ${res.id}`)
    }
    // state is behind. only show when the page is refreshed

    const reservationDate = new Date(res.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

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
                        {reservationDate >= currentDate ? <Button inverted color='red' onClick={handleCancelClick}>
                            Cancel
                        </Button> : null}
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    )
}