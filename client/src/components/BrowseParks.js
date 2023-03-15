import React, { useState, useEffect } from "react";
import NavBar from './NavBar';

import ParkList from './ParkList'

export default function BrowseParks({ setParkId, updateUser }) {
    const [parks, setParks] = useState([])

    useEffect (() => {
        fetch('/parks')
        .then(res => res.json())
        .then(data => setParks(data))
    },[])
    // console.log(parks)


    return (
        <div>
            <NavBar updateUser={updateUser}></NavBar>
            <h1>Browse all Parks</h1>
            <ParkList parks={parks} setParkId={setParkId}/>
        </div>
    )
}