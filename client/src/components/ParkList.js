import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";

import ParkCard from './ParkCard'

export default function ParkList({parks, setParkId}) {
    const parkCardsList = parks.map(park =>
        <ParkCard
            key={park.id}
            park={park}
            setParkId={setParkId}
        />
    )

    return (
        <div>
            <Card.Group className="parks cards" itemsPerRow={3}>{parkCardsList}</Card.Group>
        </div>
    )
}