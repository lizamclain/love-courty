import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap'

import Menu from './Menu';

export default function Profile({updateUser, user}) {
    const navigate = useNavigate();

    const handleEditBtnClick = () => {
        navigate('/profile/edit')
    }

    const formattedNumber = user.phone.toString().slice(0,3) + '-' + user.phone.toString().slice(3,6) + '-' + user.phone.toString().slice(6);

    return (
        <div class="mx-3">
            <Menu updateUser={updateUser}></Menu>
            <h2>{user.first_name}'s Profile</h2>
            <div className="cards">
                <Card id="card-border" style={{ width: '18rem' }}>
                    <Card.Img src={user.user_image} alt="profile picture" roundedCircle="true"/>
                </Card>
                <Card id="card-border"  style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                        <Card.Text>Age: {user.age}</Card.Text>
                        <Card.Text>{user.bio}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush" >
                        <ListGroup.Item id="card-list">{user.email}</ListGroup.Item>
                        <ListGroup.Item id="card-list">{formattedNumber}</ListGroup.Item>
                        <ListGroup.Item id="card-list">
                            <ul>
                                <li>{user.tennis_level} Tennis Player</li>
                                <li>Prefers to play {user.play_preference}</li>
                                <li>Prefers to play on {user.court_preference} courts</li>
                                <li>Been hitting since {user.year_started}</li>
                            </ul>
                        </ListGroup.Item>
                        <Button id="edit-btn"onClick={handleEditBtnClick}>Edit Profile</Button>
                    </ListGroup>
                </Card>
            </div>
        </div>
    )
}