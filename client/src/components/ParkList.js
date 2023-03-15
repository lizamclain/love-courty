import React, { useState, useEffect } from "react";

import ParkCard from './ParkCard'

export default function ParkList({parks}) {
    const parkCardsList = parks.map(park =>
        <ParkCard
            key={park.id}
            park={park}
        />
    )

    return (
        <div>
            <ul className="parks cards">{parkCardsList}</ul>
        </div>
    )
}