import React from 'react'

import NavBar from './NavBar';
import News from './News'

export default function Home() {
    return (
        <div>
            <NavBar/>
            <h1>Home</h1>
            <News/>
        </div>
    )
}
