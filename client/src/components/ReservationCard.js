import React from 'react'

import { Card , Button , Icon } from "semantic-ui-react";

export default function ReservationCard({res, handleCancelClick}) {
    const reservationDate = new Date(res.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // useEffect(() => {
    //     fetch(`/users/${user.id}`)
    //     .then(res => res.json())
    //     .then(data => setUser(data))
    // }, [])

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
                </Card>
            </Card.Group>
        </div>
    )
}