import React from 'react'
import NavBar from './NavBar';

import ParkList from './ParkList'

export default function ParkBrowse() {
    return (
        <div>
            <NavBar></NavBar>
            <h1>Browse all Parks</h1>
            <ParkList />
        </div>
    )
}