import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button, Form, Row, Col } from 'react-bootstrap'

export default function Signup({updateUser}) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])

    // state for form
    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        age: '',
        user_image: '',
        password: '',
        confirm_password: '',
        tennis_level: 0,
        play_preference: '',
        court_preference: '',
        year_started: 2023,
        bio: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const handleLoginBtnClick = () => {
        navigate('/login')
    }

    // helper functions for input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (e.target.name === 'confirm_password') {
            setPasswordsMatch(e.target.value === formData.password)
        }
    }

    // handle submit with fetch POST request
    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordsMatch) {
          const formattedPhone = formData.phone.replace(/-/g, ''); // Remove dashes from phone number
          const phoneAsNumber = parseInt(formattedPhone, 10); // Convert to integer
          const formDataWithPhone = { ...formData, phone: phoneAsNumber }; // Update formData with phone number as integer
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataWithPhone)
        })
        .then(res => {
            if (res.ok) {
                res.json().then(obj => {
                    updateUser(obj);
                    navigate('/home');
            });
            } else {
                res.json().then(json => setErrors(json.errors));
            }
        });
        } else {
            setErrors('Passwords do not match.');
        }
    };

    // add validation errors
    // add tool tip for tennis levels
    // make bio box look prettier

    return (
        <div class="mx-3">
            <p>Already have an account?</p>
            <Button id='regular-btn' onClick={handleLoginBtnClick}>Login</Button>
            <br />
            <br />
            <h1>Signup</h1>
            <div id="signup-form">
                <Form className="form" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label class="required" htmlFor="first_name">First Name: </Form.Label>
                            <Form.Control id="first_name" name="first_name" type="text" placeholder="Enter your first name" onChange={handleChange} value={formData.first_name} required/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label class="required" htmlFor="last_name">Last Name: </Form.Label>
                            <Form.Control id="last_name" name="last_name" type="text" placeholder="Enter your last name" onChange={handleChange} value={formData.last_name} required/>
                        </Form.Group>
                    </Row>
                    <Form.Group class="form-outline w-50">
                        <Form.Label class="required" htmlFor="email">Email: </Form.Label>
                        <Form.Control id="email" name="email" type="tel" placeholder="Enter your email address" onChange={handleChange} value={formData.email} required/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} class="form-outline w-50">
                            <Form.Label class="required" htmlFor="phone">Phone: </Form.Label>
                            <PhoneInput id="phone" name="phone" placeholder="phone number" defaultCountry="US"
                            value={formData.phone} onChange={phone => setFormData({...formData, phone})}
                            />
                            {/* <Form.Control id="phone" name="phone" type="integer" placeholder="Enter your phone number" onChange={handleChange} value={formData.phone} required/> */}
                        </Form.Group>
                        <Form.Group as={Col} class="form-outline w-25">
                            <Form.Label class="required" htmlFor="age">Age: </Form.Label>
                            <Form.Control id="age" name="age" type="number" min="18" max="100" placeholder="Enter your age (must be at least 18)" onChange={handleChange} value={formData.age} required/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} class="form-outline w-50">
                            <Form.Label class="required" htmlFor="password">Password: </Form.Label>
                            <Form.Control id="password" name="password" type="password" placeholder="Enter your password (min. 8 characters)" onChange={handleChange} value={formData.password} required/>
                        </Form.Group>
                        <Form.Group as={Col} class="form-outline w-50">
                            <Form.Label class="required" htmlFor="confirm_password">Confirm Password: </Form.Label>
                            <Form.Control id="confirm_password" name="confirm_password" type="password" placeholder="Confirm your password" onChange={handleChange} value={formData.confirm_password} required/>
                        </Form.Group>
                            {!passwordsMatch && (<p style={{ color: "red" }}>Passwords do not match.</p>)}
                            <p id="required-text">* required fields</p>
                    </Row>
                    <h3>Fill the rest out now or later</h3>
                        <Row>
                            <Form.Group as={Col} class="form-outline w-50">
                                <Form.Label htmlFor="user_image">Profile Picture URL: </Form.Label>
                                <Form.Control name="user_image" type="text" placeholder="Enter your profile picture url" onChange={handleChange} value={formData.user_image}/>
                            </Form.Group>
                            <Form.Group as={Col} class="form-outline w-25">
                                <Form.Label htmlFor="year_started">When did you start playing? </Form.Label>
                                <Form.Control id="year_started" name="year_started" type="number" min="1950" max="2023" placeholder="year you started" onChange={handleChange} value={formData.year_started}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="tennis_level">Tennis Level: </Form.Label>
                                <Form.Select id="tennis_level" name="tennis_level" type="select" placeholder="tennis_level" onChange={handleChange} >
                                    <option selected disabled hidden>Choose Your Tennis Level</option>
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
                                <Form.Label htmlFor="play_preference">Play Preference: </Form.Label>
                                <Form.Select id="play_preference" name="play_preference" type="select" placeholder="play_preference" onChange={handleChange} >
                                    <option selected disabled hidden>Choose Your Play Preference</option>
                                    <option value="Singles">Singles</option>
                                    <option value="Doubles">Doubles</option>
                                    <option value="Singles and Doubles">Singles and Doubles</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label htmlFor="court_preference">Court Preference: </Form.Label>
                                <Form.Select id="court_preference" name="court_preference" type="select" placeholder="court_preference" onChange={handleChange} >
                                    <option selected disabled hidden>Choose Your Court Preference</option>
                                    <option value="hard">hard</option>
                                    <option value="clay">clay</option>
                                    <option value="grass">grass</option>
                                    <option value="hard and clay">hard and clay</option>
                                    <option value="hard and grass">hard and grass</option>
                                    <option value="clay and grass">clay and grass</option>
                                    <option value="all surfaces">all surfaces</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Form.Group>
                            <Form.Label htmlFor="bio">Bio: </Form.Label>
                            <Form.Control id="bio" as="textarea" rows={3} name="bio" type="text" placeholder="Tell us about yourself" onChange={handleChange} value={formData.bio}/>
                        </Form.Group>
                        <br />
                        <Button id='sign-save-btn' type="submit" value="signup">sign up</Button>
                </Form>
            </div>
            {errors ? <h3>{errors}</h3> : null}
        </div>
    )
}
