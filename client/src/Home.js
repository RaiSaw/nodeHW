import React from 'react'
import { Card, Link, Text, Checkbox, Divider, VStack, Box, Flex, HStack, Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <Box
      as="section"
      >
      <Text as='h1'>Hey there, wanna explore our new features 🤔?</Text>
      <Button className="submit" align="center" as="a" href="signin">
          Sign in
      </Button>
      <Button className="submit" align="center"  as="a" href="signup">
          Sign up
      </Button>
    </Box>
    </div>
  )
}

export default Home