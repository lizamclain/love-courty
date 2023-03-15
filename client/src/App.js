import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import BrowseParks from './components/BrowseParks';
import ParkPage from './components/ParkPage';
import ProfilePage from './components/ProfilePage';
import MyReservations from './components/MyReservations';
import EditProfile from './components/EditProfile';

function App() {
  const [parkId, setParkId] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  const updateUser = (user) => setUser(user)
  console.log(user)

  return (
    <div className="App">
      <Routes>
        <Route
          exact path="/"
          element={<LandingPage updateUser={updateUser}/>}
        />
        <Route
          path="/login"
          element={<Login updateUser={updateUser}/>}
        />
        <Route
          path="/signup"
          element={<Signup updateUser={updateUser}/>}
        />
        <Route
          path="/home"
          element={<Home updateUser={updateUser}/>}
        />
        <Route
          path="/parks"
          element={<BrowseParks updateUser={updateUser} setParkId={setParkId}/>}
        />
        <Route
          path="/parks/:id"
          element={<ParkPage updateUser={updateUser} parkId={parkId}/>}
        />
        <Route
          path="/profile/:id"
          element={<ProfilePage updateUser={updateUser}/>}
        />
        <Route
          path="/profile/:id/reservations"
          element={<MyReservations updateUser={updateUser}/>}
        />
        <Route
          path="/profile/:id/edit"
          element={<EditProfile/>}
        />
      </Routes>
    </div>
  );
}

export default App;