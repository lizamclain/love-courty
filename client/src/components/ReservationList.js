import React from 'react'
import { Card } from "semantic-ui-react";

import ReservationCard from './ReservationCard'

export default function ReservationList({myRes, todayRes}) {
    const myResCardsList = myRes.map(res =>
        <ReservationCard
            key={res.id}
            res={res}
        />
    )

    return (
        <div>
            <Card.Group className="my-res-cards" itemsPerRow={3}>{myResCardsList}
            </Card.Group>
            {/* <Card.Group className="res-today" itemsPerRow={3}>{resTodayCardsList}
            </Card.Group> */}
        </div>
    )
}