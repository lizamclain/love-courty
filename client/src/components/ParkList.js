import React, { useState, useEffect } from "react";

import ParkCard from './ParkCard'

export default function ParkList() {
    const [parks, setParks] = useState([])

    useEffect (() => {
        fetch('/parks')
        .then(res => res.json())
        .then(data => console.log(data))
        .then(data => setParks(data))
    },[])
    const parkCards = parks.map(park =>
        <ParkCard
            key={park.id}
            park={park}
        />
    )

    return (
        <div>
            {parkCards}
        </div>
    )
}