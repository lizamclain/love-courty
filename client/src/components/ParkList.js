import React from "react";

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
        <div className="cards">
            {parkCardsList}
        </div>
    )
}