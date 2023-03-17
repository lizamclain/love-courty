import React from 'react'
import { Card } from "semantic-ui-react";

import ReservationCard from './ReservationCard'

export default function ReservationList({myRes}) {
    // const myResCardsList = myRes.map(res =>
    //     <ReservationCard
    //         key={res.id}
    //         res={res}
    //     />
    // )

    return (
        <div>
            {/* <Card.Group className="my-res-cards" itemsPerRow={3}>{myResCardsList}
            </Card.Group> */}
        </div>
    )
}