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

  return (
    <div className="App">
      <Routes>
        <Route
          exact path="/"
          element={<LandingPage/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/signup"
          element={<Signup/>}
        />
        <Route
          path="/home"
          element={<Home/>}
        />
        <Route
          path="/parks"
          element={<BrowseParks/>}
        />
        <Route
          path="/parks/:id"
          element={<ParkPage/>}
        />
        <Route
          path="/profile/:id"
          element={<ProfilePage/>}
        />
        <Route
          path="/profile/:id/reservations"
          element={<MyReservations/>}
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