import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { Box, Image, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList} from "@chakra-ui/react";
import { AuthContext } from "../helpers/AuthContext";
import '../App.css'

const Header = (theme) => {
  const headerRef = useRef(null);
  const { authState, setAuthState } = useContext(AuthContext);

  useEffect(() =>{
    let prevScrollPos = window.scrollY

    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const headerElement = headerRef.current
      if (!headerElement){
        return
      }
      if (prevScrollPos > currentScrollPos){
        headerElement.style.transform = 'translateY(0)'
      }else{
        headerElement.style.transform = 'translateY(-200px)'
      }
      prevScrollPos = currentScrollPos
    }
    window.addEventListener('scroll', handleScroll)
      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  }, [])
  let keysToRemove = ["accessToken", "username", "userId"];

  const logout = () => {
    keysToRemove.forEach(k =>
      localStorage.removeItem(k))
    setAuthState({ username: "", id: 0, status: false });
  };
  return (
    <Box
      ref={headerRef}
      position="relative"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration="0.3s"
      transitionTimingFunction="ease-in-out"
      zIndex={1}
    >
      <nav className="navbar navbar-expand-lg py-2">
      <div className="container-fluid">
        <Link className="cont" to="/" ><Image className='image' src="Assets/bynd.png" alt="Bynd Logo" boxSize="45px"/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto ml-5 mb-2 mb-lg-0 w-100">
            {!authState.status ? (
              <>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/signin">Signin</Link>
                <Link className="link" to="/signup">Signup</Link>
              </>
            ) : (
              <>
                <Link className="link" to="/gallery">Gallery</Link>
                <Menu>
                  <MenuButton className='link'>
                    Explore
                  </MenuButton>
                  <MenuList>
                    <MenuGroup>
                      <MenuItem>Learn</MenuItem>
                      <MenuItem>Playground</MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='New'>
                      <MenuItem>Create with AI✨</MenuItem>
                      <MenuItem>Capture</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton className="link">Connect</MenuButton>
                    <MenuList>
                        <MenuItem>About</MenuItem>
                        <MenuItem>Community</MenuItem>
                      <MenuDivider />
                      <MenuGroup title='Help'>
                        <MenuItem><Link to="/contact" className="link" >Contact us</Link></MenuItem>
                        <MenuItem>FAQs</MenuItem>
                      </MenuGroup>
                    </MenuList>
                </Menu>
                <Box className="loggedInContainer" justifyContent="flex-end" justifySelf="end">
                  <Link className="link" to="/profile">Profile</Link>
                  {authState.status && <Link to="/" className="link" onClick={logout}>Logout</Link>}
                </Box>
              </>
            )}
        </ul>
        </div>
      </div>
      </nav>
    </Box>
  );
};
export default Header;
