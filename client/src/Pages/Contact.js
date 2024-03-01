import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Textarea, Container, HStack, Flex, CloseButton, Text, Input, Button, Link, Card } from "@chakra-ui/react";
import "../App.css";

const Contact = () => {
  const navigate = useNavigate();
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
    <Container maxWidth="1280px">
        <Card
        className="cardMain"
        bg='url("./Assets/endless.jpg") center/cover no-repeat'
        filter='auto'
        invert='8%'
        boxShadow='dark-lg'
        textShadow='0 0 0.7em #fff;'
        justifyContent="center"
        justifyItems="center"
        >
          <HStack my="3" px="4" justifyContent="space-between">
          <HStack>
            <Text as="h5" my="1" id='contact-title'>Contact us</Text>
            <i className="fa-solid fa-envelope"></i>
          </HStack>
          <CloseButton size='md'
          onClick={()=>navigate('/gallery')}
          variant='solid'
          aria-label='Close icon'
          color="white"
          id='x'
          justifySelf="end"
          />
          </HStack>
          <Text mb="2" id='contact-p'>We'd love to hear from you.<br />Please drop your name, email and message.</Text>
        <form className='form1' action="#" method="POST">
          <Input mb="1rem"className="username" type="text" id="name" name="name" placeholder="Enter your name" required />
          <Input mb="1rem" className="email" type="email" id="emailContact" name="email" placeholder="Enter your email" required />
          <Textarea mb="1rem" className="password" id="message" name="message" rows="4" placeholder="Enter your message" required></Textarea>
          <Flex justifyContent="center">
          <Button className="submit" variant="button" type="submit" >Submit</Button>
          </Flex>
        </form>
        <Box className="space-x-8 my-6 flex justify-center">
          <Link className="icon" href="linkedin.com"><i className="fa-brands fa-linkedin"></i></Link>
          <Link className="icon" href="discord.com"><i className="fa-brands fa-discord"></i></Link>
          <Link className="icon" href="instagram.com"><i className="fa-brands fa-instagram"></i></Link>
        </Box>
      </Card>
      </Container>
    </Box>
    </Flex>
  )
}

export default Contact