import React, {useState} from "react";
import { Card, Link, Container,  Button,  IconButton, Input, InputRightElement, Spacer, Text, Checkbox, FormControl, FormLabel, FormErrorMessage, Divider, VStack, HStack} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';
import axios from "axios";
import {Formik, Field, Form} from 'formik'
import * as Yup from 'yup';
import { redirect, useNavigate } from "react-router-dom";
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'


function Signup({accts}) {
  const [submit, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const route = axios.create({
    baseURL: "http://localhost:3001"
  });

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setNewUser({ ...newUser, [name]:value });
}

  const data = {
    name: newUser.username,
    email: newUser.email,
    password: newUser.password,
  }

  const onSubmit = (e) => {
    e.preventDefault()
    route
      .post("/users", data)
      .then((res) => {
        if (res.status === 400) {
          throw error ("User not created!")
        } else {
          console.log(res.data)
          setSubmitted(true);
          setInterval(() => {
            navigate("/signin")
          }, 5000);
        }
      })
      .catch((error) => {
        console.log(error);

      })
  };
  return (
    <>
    {!submit ? (
    <Card className="main">
      <VStack justifyContent='center'>
        <Text className="sign" align="center">
          Sign up
        </Text>

        <form
        className="form1"
        onSubmit={onSubmit}
        >
          <input
           className="username"
           type="text"
           placeholder="Username"
           value={ newUser.username}
           onChange={handleChange}
           id="username"
           required
           minLength={2}
           maxLength={25}
           name="username"
           />
           <input
            className="email"
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            value={ newUser.email}
            onChange={handleChange}
            required
            />
          <input
          className="password"
          type='password'
          placeholder="Password"
          id="password"
          name="password"
          value={ newUser.password}
          onChange={handleChange}
          minLength={8}
           maxLength={25}
          required
          />
          <Button type="submit" className="submit" align="center" justifySelf="center">
            Sign up
          </Button>
          </form>
          <Text className="redi" align="center">
            <Link className="redi" href="signin">Already have an account? </Link>
          </Text>
            <Text className="authText">
              or sign in with
            </Text>
            <HStack gap={2}>
                {accts.map((acct) =>(
                  <a key={acct.url} href={acct.url} rel='navicons'>
                    <FontAwesomeIcon className='auth' icon={acct.icon} />
                  </a>
                ))}
            </HStack>
      </VStack>
    </Card>
    ) : (
    <Container>
      <Text as='h1'>Thanks for creating an account {data.name} 🤗!</Text>
    </Container>
    )
    }
    </>
  );
}

export default Signup;
