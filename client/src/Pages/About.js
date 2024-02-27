import React from 'react'
import { Box, Container} from "@chakra-ui/react";
import "../App.css";

const About = () => {
  return (
    <Box
      as="section"
      w={['80%', '100%', '100%']}
      left={0}
      right={0}
      margin='0 auto'
      height={700}
      bg='#fff'
      alignContent='center'
      justifyContent='center'
      justifyItems='center'
      alignItems='center'
      justifySelf='center'
      alignSelf='center'
      >
      <Container maxWidth="1280px">
      About
      </Container>
      </Box>
  )
}

export default About