import React, {useState} from "react";
import { Card, Link, Container, Flex, Button,  IconButton, Input, InputRightElement, InputGroup, Text, Box, FormControl, AbsoluteCenter, FormErrorMessage, Divider, VStack, HStack} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Formik, Field, Form} from 'formik'
import * as Yup from 'yup';
import { redirect, useNavigate } from "react-router-dom";
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons'
import { route, accts } from '../App';


function Signup() {
  const [submit, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const [show, setShow] = useState(false)
  const handlePw = () => setShow(!show)

  const [newUser, setUser] = useState({
  name: "",
  email: "",
  password: "",
})

  const onSubmit = (values) => {
    route
      .post("/users", values)
      .then((res) => {
        if (res.status === 400) {
          throw error ("User not created!")
        } else {
          console.log(res.data)
          setSubmitted(true);
          setUser(values)
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
    <Flex
    align='center'
    justify='center'
    >
    <Box
    className='signup'
    as='section'
    color="#333"
    maxWidth="1280px"
    left={0}
    right={0}
    p={12}
    w={500}
    border= 'none'
    >
    {!submit ? (
    <Card className="cardMain" boxShadow="2xl">
      <VStack justifyContent='center'>
        <Text className="sign">
          Sign up
        </Text>
        <Formik
        initialValues={newUser}
        onSubmit={onSubmit}
        validationSchema= {Yup.object({
          name: Yup.string().required('Username is required').min(2,'Must contain at least 2 characters'),
          email: Yup.string().email('Please enter a valid email').required('Please enter your email'),
          password: Yup.string().required('Password is required').min(8,'Password must contain at least 8 characters - (a symbol, upper & lower case letters & a number)')
        })}
        >
          {({errors, touched}) => (
            <Form className="form1">
                <FormControl className="formCtrl" isInvalid={!!errors.name && touched.name}>
                  <Field
                  as={Input}
                  className="username"
                  type="text"
                  placeholder="Username"
                  name="name"
                  />
                  <FormErrorMessage className="errorMessage">{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl className="formCtrl" isInvalid={!!errors.email && touched.email}>
                  <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder='Email address'
                  className="email"
                  />
                  <FormErrorMessage className="errorMessage">{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl className="formCtrl" isInvalid={!!errors.password && touched.password}>
                  <InputGroup>
                  <Field
                  as={Input}
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder='Password'
                  className="password"
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
                  <FormErrorMessage className="errorMessage">{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" variant="button" className="submit">
                  Sign up
                </Button>
            </Form>
          )}
        </Formik>
        <VStack>
          <Link className="redi" href="signin">Already have an account? </Link>
          <Box position='relative'>
            <Divider className="divider" border="0.5px dashed" />
            <Text className="authText">or sign in with</Text>
          </Box>
            <HStack gap={2}>
                {accts.map((acct) =>(
                  <a key={acct.url} href={acct.url} rel='navicons'>
                    <FontAwesomeIcon className='auth' icon={acct.icon} />
                  </a>
                ))}
            </HStack>
          </VStack>
      </VStack>
    </Card>
    ) : (
    <Container>
      <Card>
      <Text as='h1'>Thanks for creating an account {newUser.name} 🤗!</Text>
      </Card>
    </Container>
    )
    }
    </Box>
    </Flex>
    </>
  );
}

export default Signup;
