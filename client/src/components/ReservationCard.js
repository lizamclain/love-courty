import React, {useState, useEffect} from 'react'
import { Card, Button, ButtonGroup, Row, Col, Modal, Form }from 'react-bootstrap';
import { BsMap, BsHourglassSplit } from 'react-icons/bs';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';

export default function ReservationCard({res, handleCancelClick, handleEdit, user}) {
    const reservationDate = new Date(res.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const [park, setPark] = useState({available_times: []}, {ratings: []})
    const [errors, setErrors] = useState([])
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCancelModalClose = () => setShowCancelModal(false);
    const handleCancelModalShow = () => setShowCancelModal(true);
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = () => setShowEditModal(true);

    useEffect(() => {
        fetch(`/parks/${res.park_id}`)
        .then(res => res.json())
        .then(data => setPark(data))
    }, [])

    // initial state for edit reservation form
    const initialState = {
        user_id: res.user_id,
        park_id: res.park_id,
        park: res.park,
        date: res.date,
        time: res.time,
        duration: res.duration,
        cost: res.cost
    }

    const [formData, setFormData] = useState(initialState)

    // helper functions for new reservation form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleClick = (value) => {
        setFormData({ ...formData, time: value });
    }

    // function to render available park times
    const renderTimes = park.available_times.map((time) => {
        const isSelected = time === formData.time
        return (
            <Button
                type="button"
                name="time"
                value={time}
                id='regular-btn'
                onClick={() => handleClick(time)}
                className={isSelected ? "selected" : ""}
                placeholder={initialState.time}
            >
                {time >= 12 ? time === 12 ? '12:00 PM' : `${time - 12}:00 PM` : `${time}:00 AM`}
            </Button>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
        fetch(`/reservations/${res.id}`, {
        // fetch(`/users/${user.id}/edit_reservation/${res.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((r) => {
            if (r.ok) {
                return r.json()
                .then(handleEdit)
            } else {
                r.json().then((json) => setErrors(json.errors));
            }
        });
        // console.log(formData);
        handleEditModalClose();
    }

    return (
        <div>
            <Row xs={1} md={3} className="g-4">
                <Col>
                <Card id="card-border" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{res.park}</Card.Title>
                        <Card.Text>
                            <AiOutlineCalendar></AiOutlineCalendar>
                            Date: {res.date}</Card.Text>
                        <Card.Text>
                            <BiTime></BiTime>
                            Time: {res.time}</Card.Text>
                        <Card.Text>
                            <BsHourglassSplit></BsHourglassSplit>
                            Hours Reserved: {res.duration}</Card.Text>
                        <Card.Text>
                            <FaRegMoneyBillAlt></FaRegMoneyBillAlt>
                            Total Price: ${res.cost}</Card.Text>
                        <Card.Text extra>
                                <BsMap></BsMap>
                            <a id='card-link' href={res.directions} target="_blank">
                                Directions
                            </a>
                    </Card.Text>
                    <ButtonGroup>
                        {reservationDate >= currentDate ? <Button id='cancel-btn' onClick={handleCancelModalShow}className="mr-2">Cancel</Button> : null}
                        {reservationDate >= currentDate ? <Button id='sign-save-btn' onClick={handleEditModalShow}
                        className="ml-2">Edit</Button> : null}
                    </ButtonGroup>
                    <Modal show={showCancelModal} onHide={handleCancelModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title id='modal-title'>Cancel Reservation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body id='modal-title'>Are you sure you want to cancel this reservation?</Modal.Body>
                        <Modal.Footer>
                            <Button id='sign-save-btn' onClick={handleCancelModalClose}>Nevermind, don't cancel</Button>
                            <Button id='cancel-btn' onClick={() => handleCancelClick(res.id)}>Yes, Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showEditModal} onHide={handleEditModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title id='modal-title'>Edit Reservation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form id="edit-form" onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="date">Edit date: </Form.Label>
                                    <Form.Control id="date" name="date" type="date" style={{ width: '30%' }} placeholder={initialState.date} onChange={handleChange}></Form.Control>
                                    <br />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="time">Edit Time: </Form.Label>
                                    <br />
                                    {renderTimes}
                                </Form.Group>
                                    <br />
                                    <Form.Label htmlFor="duration">How many hours would you like to reserve? </Form.Label>
                                    <Form.Control id="duration" name="duration" type="number" style={{ width: '15%' }} min="1" max="3" placeholder={initialState.duration} onChange={handleChange}></Form.Control>
                                </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button id='regular-btn' onClick={handleEditModalClose}>Exit</Button>
                            <Button id='sign-save-btn' type="submit" onClick={handleSubmit}>Save</Button>
                        </Modal.Footer>
                    </Modal>
                    {errors ? <h3>{errors}</h3> : null}
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    )
}