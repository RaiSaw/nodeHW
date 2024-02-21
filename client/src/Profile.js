import React, {useState, useEffect, useContext} from 'react'
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Container, Text, SimpleGrid, Divider, VStack, Box, Flex, HStack, Button } from "@chakra-ui/react";
import './App.css'

const Profile = () => {
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();
  const route = axios.create({
    baseURL: "http://localhost:3001"
  });
  useEffect(() => {
      const fetchPost = async () => {
        if (!localStorage.getItem("username")) {
          navigate("/signin");
        }else{
          try {
            let response = await route.get('/models');
            setModels(response.data);
          } catch (error) {
            console.log(error);
          }
        }
      }
      fetchPost();
   }, [authState])

   const deleteModel = async (title) => {
    await route.delete(`/models/${title}`);
    setModels(
       models.filter((post) => {
          return post.title !== title;
       })
    );
 };
  return (
    <Container>
      <Text as="h1">All Models</Text>
      <SimpleGrid
        gridTemplateColumns="repeat(4,minmax(100px,1fr))"
        columns={{ md:3, lg:4, xl:4}}
        gridGap={4}
        justifyContent='center'
      >
        {models.map((post) => (
          <Card
          key={post.title}
          boxShadow='dark-lg'
          border="2px black solid"
          className='card'
          >
            <VStack justifyContent='center'>
            <Text>Title: {post.title}</Text>
            <Text>Type: {post.type}</Text>
            <Button className="submit" ml='-9' onClick={() => deleteModel(post.title)}>Delete</Button>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Profile