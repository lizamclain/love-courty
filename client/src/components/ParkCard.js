import React from 'react'
import { Card , Button , Icon , Label , Image , Container, Modal } from "semantic-ui-react";

export default function Park({parks}) {
    return (
        <div>
            <Card>
                <Image src={parks.park_image}/>
                <Card.Content>
                    <Card.Header>{parks.name}</Card.Header>
                </Card.Content>
            </Card>
        </div>
    )
}