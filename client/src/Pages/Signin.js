import React, {useState, useContext} from "react";
import { Card, Link, Text, Flex, Box, Divider, InputGroup, Input, VStack, InputRightElement, IconButton, HStack, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { route, accts } from '../App';
import { AuthContext } from "../helpers/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const [show, setShow] = useState(false)
  const handlePw = () => setShow(!show)


  const login = () => {
    const data = { name: username, password: password };
    if (!authState) {
      localStorage.removeItem("accessToken");
    }
    route
      .post("/signin", data)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          navigate("/signin")
        } else {
          console.log(response.data)
          localStorage.setItem("accessToken", response.data.token );
          localStorage.setItem("username", response.data.username );
          setAuthState({
            username: response.data.name,
            id: response.data.id,
            status: true,
          });
          navigate("/gallery")
        }
      }).catch((error) => {
        console.log(error);
        console.log("Invalid credentials!")
        navigate("/signin")
     });
  };
  return (
    <Flex align='center' justify='center'>
    <Box
    className='login'
    as='section'
    color="#333"
    maxWidth="1280px"
    left={0}
    right={0}
    p={12}
    rounded='xl'
    w={500}
    border= 'none'
    >
    <Card className="cardMain" boxShadow="2xl">
      <VStack justifyItems="center">
      <Text className="sign">
        Sign in
      </Text>
      <form className="form1">
        <Input
         className="username"
         type="text"
         placeholder="Username"
         name="username"
         value={username}
         onChange={(event) => {
          setUsername(event.target.value);
        }}
        mb="1rem"
         />
        <InputGroup>
        <Input
        className="password"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        name="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        mb="1rem"
        />
        <InputRightElement>
        <IconButton
        aria-label='View password icon'
        onClick={handlePw}
        size='sm'
        className="eye"
        variant='ghost'
        >
          {show ? <ViewOffIcon/>:<ViewIcon/>}
        </IconButton>
        </InputRightElement>
        </InputGroup>
        <Button className="submit" onClick={login}>
          Sign in
        </Button>
      </form>
        <VStack>
          <Link className="redi" href="signup" >Don't have an account yet?</Link>
          <Box position='relative'>
          <Divider className="divider" border="0.5px dashed"/>
          <Text className="authText">or sign in with</Text>
          </Box>
          <HStack gap={2}>
            {accts.map((acct) =>(
              <a key={acct.url} href={acct.url} rel='navicons'>
                <FontAwesomeIcon  className='auth' icon={acct.icon} />
              </a>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Card>
    </Box>
    </Flex>
  );
}

export default Signin;
