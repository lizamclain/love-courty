import React, { useState, useEffect } from "react";
import NavBar from './NavBar';

import ParkList from './ParkList'
import Search from './Search'

export default function BrowseParks({ setParkId, updateUser }) {
    const [parks, setParks] = useState([])
    const [searchText, setSearchText] = useState("")


    useEffect (() => {
        fetch('/parks')
        .then(res => res.json())
        .then(data => setParks(data))
    },[])
    // console.log(parks)

    const handleSearchInput = (e) => {
        setSearchText(e.target.value)
    }

    const searchedParks = parks.filter(park => park.name.toLowerCase().includes(searchText.toLowerCase()))

    return (
        <div>
            <NavBar updateUser={updateUser}></NavBar>
            <Search searchText={searchText} handleSearchInput={handleSearchInput}/>
            <h1>Browse all Parks</h1>
            <ParkList parks={searchedParks} setParkId={setParkId}/>
        </div>
    )
}