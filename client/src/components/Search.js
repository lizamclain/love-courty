import React, { useState } from 'react'

export default function Search( {searchText, handleSearchInput} ) {

    return (
        <div>
            <h1>Search</h1>
            <div className="searchbar">
                <label htmlFor="search">Search Parks: </label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Type a park to search..."
                        value={searchText}
                        onChange={handleSearchInput}
                        // onChange={(e) => console.log("Searching...")}
                    />
            </div>
        </div>
    )
}