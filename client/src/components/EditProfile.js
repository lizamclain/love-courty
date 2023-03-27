import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap'
import bcrypt from 'bcryptjs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function EditProfile({ updateUser, user }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/profile')
    }

    const formattedNumber = user.phone.toString().slice(0,3) + '-' + user.phone.toString().slice(3,6) + '-' + user.phone.toString().slice(6);

    // state for form --> bring in currentUser state
    const initialState = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        phone: user.phone,
        user_image: user.user_image,
        password: "",
        tennis_level: user.tennis_level,
        play_preference: user.play_preference,
        court_preference: user.court_preference,
        year_started: user.year_started,
        bio: user.bio
    };
    const [formData, setFormData] = useState(initialState);
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (e.target.name === 'password') {
            const result = await bcrypt.compare(e.target.value, user.password_digest)
            setPasswordMatch(result);
            };
    }

    // handle edit with fetch PATCH request
        const handleSubmit = (e) => {
        e.preventDefault()
        if(passwordMatch) {
            fetch(`/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(obj => updateUser(obj))
            .then(() => {
                alert('Your profile has been updated.')
                navigate('/profile')
            })
        } else {
            alert('Please type in your current password to continue.')
        }
    }

    const handleDeleteClick = (e) => {
        console.log('deleted')
        if(passwordMatch) {
            e.preventDefault()
            fetch(`/users/${user.id}`, {
                method: 'DELETE'
            })
            .then(updateUser(null))
            .then(alert("Your account has been deleted."))
            .then(navigate('/signup'))
        } else {
            alert('Please type in your current password to continue.')
        }
    }

    // make bio box bigger
    // have a way to actually see / copy paste the bio? or click the field and then editing is allowed?

    return (
        <div class="mx-3">
            <h1>Edit Profile</h1>
            <Button id="regular-btn" onClick={handleBackClick}>back to profile</Button>
            <br />
            <br />
            <div id="edit-form">
                <Form className="form" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="first_name">First Name: </Form.Label>
                            <Form.Control id="first-name" name="first_name" type="text" placeholder={user.first_name} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="last_name">Last Name: </Form.Label>
                            <Form.Control id="last_name" name="last_name" type="text" placeholder={user.last_name} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="email">Email: </Form.Label>
                            <Form.Control id="email" name="email" type="text" placeholder={user.email} onChange={handleChange}/>
                            {/* <PhoneInput name="phone" placeholder="phone number" defaultCountry="US"
                            value={value} onChange={setValue}
                            /> */}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="phone">Phone: </Form.Label>
                            <Form.Control id="phone" name="phone" type="text" placeholder={formattedNumber} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="age">Age: </Form.Label>
                            <Form.Control id="age" name="age" type="number" min="18" max="100" placeholder={user.age} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                        {/* <p>Profile Picture</p><input name="profile_picture" type="file" placeholder="profile picture"/> */}
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="user_image">Profile Picture URL: </Form.Label>
                            <Form.Control id="user_image" name="user_image" type="text" placeholder={user.user_image} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="tennis_level_select">Tennis Level: </Form.Label>
                            <Form.Select id="tennis_level-select" name="tennis_level" type="select" placeholder={user.tennis_level} onChange={handleChange}>
                                <option selected disabled hidden>{user.tennis_level}</option>
                                <option value="1.5">1.5</option>
                                <option value="2.0">2.0</option>
                                <option value="2.5">2.5</option>
                                <option value="3.0">3.0</option>
                                <option value="3.5">3.5</option>
                                <option value="4.0">4.0</option>
                                <option value="4.5">4.5</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label htmlFor="play_preference_select">Play Preference: </Form.Label>
                            <Form.Select id="play_preference_select" name="court_preference" type="select" placeholder={user.play_preference} onChange={handleChange}>
                                    <option selected disabled hidden>{user.play_preference}</option>
                                    <option value="Singles">Singles</option>
                                    <option value="Doubles">Doubles</option>
                                    <option value="Singles and Doubles">Singles and Doubles</option>
                            </Form.Select>
                        </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="court_preference_select">Court Preference: </Form.Label>
                                <Form.Select id="court_preference_select" name="court_preference" type="select" placeholder={user.court_preference} onChange={handleChange}>
                                    <option selected disabled hidden>{user.court_preference}</option>
                                    <option value="hard">hard</option>
                                    <option value="clay">clay</option>
                                    <option value="grass">grass</option>
                                    <option value="hard and clay">hard and clay</option>
                                    <option value="hard and grass">hard and grass</option>
                                    <option value="clay and grass">clay and grass</option>
                                    <option value="all surfaces">all surfaces</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="year_started">Year Started: </Form.Label>
                                <Form.Control id="year_started" name="year_started" type="number" min="1950" max="2023" placeholder={user.year_started} onChange={handleChange}/>
                            </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label htmlFor="bio">Bio: </Form.Label>
                            <Form.Control id="bio" name="bio" type="text" placeholder={user.bio} onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="password">Confirm Password: </Form.Label>
                            <Form.Control id="password" name="password" type="password" placeholder={user.password} onChange={handleChange} required/>
                        {!passwordMatch && (<p style={{ color: "red" }}>Enter current password to save changes.</p>)}
                        </Form.Group>
                    </Row>
                        <Button id='sign-save-btn' type="submit" onClick={handleSubmit}>Save</Button>
                </Form>
                <Popup trigger={<Button id="cancel-btn">Delete Account</Button>} modal nested>
                    {
                        close => (
                            <div className="modal">
                                <div className="content">
                                    Are you sure you want to delete your account?
                                    <Button id="regular-btn" onClick={handleDeleteClick}>Yes, delete.</Button>
                                    <Button id="cancel-btn" onClick={() => close()}>Nevermind, don't delete</Button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
        </div>
    )
}