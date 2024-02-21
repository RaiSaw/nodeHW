import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, redirect, useNavigate } from 'react-router-dom';
import {
  faGoogle,
  faYahoo,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons"
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import Profile from './Profile';
import './App.css';
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext"


const accts = [
  {
    icon: faGoogle,
    url: "https://www.google.com",
  },
  {
    icon: faDiscord,
    url: "http://localhost:3001/discord",
  },
  {
    icon: faYahoo,
    url: "https://yahoo.com",
  }
]

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  /* const navigate = useNavigate(); */

  const route = axios.create({
    baseURL: "http://localhost:3001"
  });

  const logout = async () => {
    try {
      await route.post("/logout")
      .then((response) => {
        console.log(response.data)
        localStorage.removeItem("username");
        setAuthState({ username: "", id: 0, status: false });
      }).catch((error) => {
        console.log(error);
     });
    } catch(error) {
      console.log(error.message)
    }
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/signin">Signin</Link>
                  <Link to="/signup">Signup</Link>
                </>
              ) : (
                <>
                  <Link to="profile">Profile</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              {/* <h1>{authState.username}</h1> */}
              {authState.status && <Link to="/signin" onClick={logout}>Logout</Link>}
            </div>
          </div>
        <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="signin" element={<Signin accts={accts}/>} />
          <Route path="signup" element={<Signup accts={accts}/>} />
        </Routes>
        </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
