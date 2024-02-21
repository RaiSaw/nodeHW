import React, {useState, useContext} from "react";
import { Card, Link, Text, Checkbox, Divider, VStack, Box, Flex, HStack, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import { redirect, useNavigate } from "react-router-dom";

const Signin = ({accts}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const route = axios.create({
    baseURL: "http://localhost:3001"
  });

  const login = () => {
    const data = { name: username, password: password };
    route
      .post("/auth", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data)
          localStorage.setItem("username", response.data.name ?? username);
          setAuthState({
            username: response.data.name,
            id: response.data.id,
            status: true,
          });
          navigate("/profile")
        }
      }).catch((error) => {
        console.log(error);
        alert("Invalid credentials!")
     });
  };
  return (
    <Card className="main">
      <Text className="sign" align="center">
        Sign in
      </Text>
      <form className="form1">
        <input
         className="username"
         type="text"
         placeholder="Username"
         value={username}
         onChange={(event) => {
          setUsername(event.target.value);
        }}
         />
        <input
        className="password"
        type='password'
        placeholder="Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        />
        <Button className="submit" align="center" onClick={login} ml='35%'>
          Sign in
        </Button>
        <Text className="redi" align="center">
          <Link className="redi" href="signup" >Don't have an account yet?</Link>
        </Text>
      </form>
          <VStack>
          <Text className="authText">
            or sign in with
          </Text>
          <HStack gap={2}>
              {accts.map((acct) =>(
                <a key={acct.url} href={acct.url} rel='navicons'>
                  <FontAwesomeIcon  className='auth' icon={acct.icon} />
                </a>
              ))}
            </HStack>
          </VStack>
    </Card>
  );
}

export default Signin;
