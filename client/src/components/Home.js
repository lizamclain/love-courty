import React, {useEffect} from 'react'

import NavBar from './NavBar';
import News from './News'

export default function Home({updateUser}) {

    return (
        <div>
            <NavBar updateUser={updateUser}/>
            <h1>Home</h1>
            <News/>
        </div>
    )
}
