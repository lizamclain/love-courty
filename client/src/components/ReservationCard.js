import React from 'react'
import { Card , Button , Icon , Label , Image , Container, Modal } from "semantic-ui-react";

export default function Reservation({res}) {

    const handleCancelClick = () => {
        console.log(`cancelled ${res.id}`)
    }
    // something up with the res.id, probably need to make a setter function like i did with parkId

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
                        <Card.Content><Icon name="clock outline"/>Time: {res.time}:00</Card.Content>
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