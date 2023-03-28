import React from 'react'
import { Container, Form, Row, Col } from 'react-bootstrap'


export default function Search( {searchText, handleSearchInput, selectedLights, selectedSurface} ) {

    // add filter for rating and cost range?

    return (
        <div className="heading-search" class="mx-1">
            <h2 className="heading-search">Narrow your Search</h2>
            <Container>
                <Row>
                    <Col id="search">
                        <label htmlFor="search">🔎 Search Parks: </label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Type a park to search..."
                                value={searchText}
                                onChange={handleSearchInput}
                            />
                    </Col>
                    <Col className="filter" id='top-left-filter'>
                        <label htmlFor="lights">💡 Lights? </label>
                        <Form.Select onChange={selectedLights}>
                            <option value="All">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </Form.Select>
                    </Col>
                    <Col className="filter" id="top-right-filter">
                        <label htmlFor="surface">👟 Court Surface: </label>
                        <Form.Select onChange={selectedSurface}>
                            <option value="All">All</option>
                            <option value="hard">hard</option>
                            <option value="clay">clay</option>
                            <option value="grass">grass</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}