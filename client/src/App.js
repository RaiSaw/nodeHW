import { useRef, useState, createContext, useEffect } from 'react'
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from "wouter"//Route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {faGoogle, faYahoo, faDiscord} from "@fortawesome/free-brands-svg-icons"
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "./helpers/AuthContext.js"
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Gallery from './Pages/Gallery.js'
import Error from './Pages/Error.js'
import Contact from './Pages/Contact.js'
import Model from './Pages/Model.js'
import Signin from './Pages/Signin.js';
import Signup from './Pages/Signup.js';
import Home from './Pages/Home.js';
import Profile from './Pages/Profile.js';
import axios from "axios";
import './App.css';

export const ThemeContext = createContext(null);

export const route = axios.create({
    baseURL: "http://localhost:3001" /* `${process.env.SERVER_URL}` */
  });

export const accts = [
  {
    icon: faGoogle,
    url: "https://www.google.com",
  },
  {
    icon: faDiscord,
    url: "https://discord.com",
  },
  {
    icon: faYahoo,
    url: "https://yahoo.com",
  }
]

export default function App() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false,
      });
    const { toggleColorMode, colorMode } = useColorMode()
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="gallery" element={<Gallery/>} />
          <Route path="model/:title" element={<Model/>} />
          <Route path="contact" element={<Contact/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
        <Footer/>
      </Router>
      <IconButton
      aria-label="toggle theme"
      rounded="full"
      fontSize="2xl"
      position="fixed"
      bottom={7}
      right={5}
      variant='ghost'
      zIndex={1}
      onClick={toggleColorMode} icon={colorMode === "dark" ? <FontAwesomeIcon className="icon" icon={faSun} color= "#FFD43B" /> : <FontAwesomeIcon className="icon" icon={faMoon}/>}
      />
    </AuthContext.Provider>
  )
}

