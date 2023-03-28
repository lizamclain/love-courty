import React, { useState, useEffect } from "react";
import Menu from './Menu';
import ParkList from './ParkList'
import Search from './Search'

export default function BrowseParks({ setParkId, updateUser }) {
    const [parks, setParks] = useState([])
    const [searchText, setSearchText] = useState("")
    const [slctLight, setSlctLight] = useState("All")
    const [slctSurface, setSlctSurface] = useState("All")


    useEffect (() => {
        fetch('/parks')
        .then(res => res.json())
        .then(data => setParks(data))
    },[])
    // console.log(parks)

    const handleSearchInput = (e) => {
        setSearchText(e.target.value)
    }

    const selectedLights = (e) => {
        setSlctLight(e.target.value)
    }

    const selectedSurface = (e) => {
        setSlctSurface(e.target.value)
    }

    const searchedParks = parks.filter(park => park.name.toLowerCase().includes(searchText.toLowerCase()))

    const filteredParks = searchedParks.filter(park => {
        if(slctLight === "All") return true
        return park.lights === slctLight
    })
    .filter(park => {
        if(slctSurface === "All") return true
        return park.court_type === slctSurface
    })

    return (
        <div class="mx-4">
            <Menu updateUser={updateUser}></Menu>
            <Search searchText={searchText} handleSearchInput={handleSearchInput} selectedLights={selectedLights} selectedSurface={selectedSurface} slctLight={slctLight} slctSurface={slctSurface}/>
            <br />
            <h2 className="heading-search"> Browse all Parks</h2>
            <ParkList parks={filteredParks} setParkId={setParkId}/>
        </div>
    )
}