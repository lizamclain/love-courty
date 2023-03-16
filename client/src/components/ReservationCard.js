import React from 'react'
import { Card , Button , Icon , Label , Image , Container, Modal } from "semantic-ui-react";

export default function Reservation({res}) {
    
    const handleCancelClick = () => {
        console.log(`cancelled ${res.id}`)
    }
    // something up with the res.id, probably need to make a setter function like i did with parkId
    return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>{res.park}</Card.Header>
                    <Card.Content><Icon name="calendar alternate outline"/>Date: {res.date}</Card.Content>
                    <Card.Content><Icon name="clock outline"/>Time: {res.time > 12 ? res.time - 12 : res.time}:00</Card.Content>
                    <Card.Content><Icon name="hourglass half"/>Hours Reserved: {res.duration}</Card.Content>
                    <Card.Content>
                        <Icon name="money bill alternate outline"/>Total Price: ${res.cost}</Card.Content>
                    <Card.Content extra>
                        <a href={res.directions} target="_blank">
                            <Icon name="map outline"/>
                            Directions
                        </a>
                    </Card.Content>
                    <Button inverted color='red' onClick={handleCancelClick}>
                        Cancel
                    </Button>
                </Card.Content>
            </Card>
        </div>
    )
}