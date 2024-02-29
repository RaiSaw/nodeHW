import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Circle, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import '../App.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer d-flex flex-row flex-wrap justify-content-between align-items-center py-2 px-3">
        <div className="col d-flex space-x-4 align-items-center" >
          <Link className="cont" to="/"><Image className='image' src="../Assets/bynd.png" alt="Logo" boxSize='80px' alignSelf="center"/></Link>
          <span className="align-self-center">&copy; Bynd 2024</span>
        </div>
      </footer>
    )
  }
}