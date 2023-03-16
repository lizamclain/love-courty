import React, { useState } from 'react'

export default function Search( {searchText, handleSearchInput, selectedLights, selectedSurface} ) {

    // add filter for rating and cost range?

    return (
        <div>
            <h1>Search</h1>
            <div className="searchbar">
                <label htmlFor="search">🔎 Search Parks: </label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Type a park to search..."
                        value={searchText}
                        onChange={handleSearchInput}
                    />
            </div>
            <div className="filter">
                <label htmlFor="lights">💡 Lights? </label>
                <select onChange={selectedLights}>
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="surface">👟 Court Surface: </label>
                <select onChange={selectedSurface}>
                    <option value="All">All</option>
                    <option value="hard">hard</option>
                    <option value="clay">clay</option>
                    <option value="grass">grass</option>
                </select>
            </div>
        </div>
    )
}