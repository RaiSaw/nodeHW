import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Container, Text, SimpleGrid, Select, VStack, Box, FormLabel, Input, FormControl, FormErrorMessage, Button } from "@chakra-ui/react";
import { route } from '../App';
import { modelTypes } from './Gallery';
import ModelCard from '../components/ModelCard'

const Profile = () => {
  const [username, setUsername] = useState("");
  const { authState } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const user = localStorage.getItem("username")
  let creator = user;

  useEffect(() => {
    const fetchPost = async () => {
      if (!localStorage.getItem("accessToken")) {
        navigate(`${process.env.SERVER_URL}/signin`);
      } else {
        try {
          let id = authState.id
          let response = await route.get(`/users/${id}`);
          setUsername(response.data.name);
        } catch (error) {
          console.log(error);
        }
      }
    }
    const fetchModels = async () => {
      if (!localStorage.getItem("accessToken")) {
        navigate(`${process.env.SERVER_URL}/signin`);
      } else {
      try {
        let response = await route.get(`/${creator}`);
        setModels(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
      }
    }
    fetchPost()
    fetchModels()
   }, [])

 // ADD model
 const [newModel, setNewModel] = useState({
  imgUrl: '',
  title: '',
  type: '',
  creator: user
});
// Image sample
const img = 'Assets/simonleeUnsplash.jpg'
// Create a new item object
const newObject = { title: newModel.title, type: newModel.type, imgUrl: newModel.imgUrl ?? img, creator: user ?? localStorage.getItem("username") };
// POST Request
const postData = async () => {
  const postResponse = await route.post(`${process.env.SERVER_URL}/models`,
  newObject,
  {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  }
  )
  .then((response) => {
    if (response.data.error) {
      console.log(response.data.error);
    } else {
      setModels([postResponse.data, ...models])
      console.log("Model added!")
    }
  })
  .catch((error) => {
      console.log(error);
  });
}
// Handle submit
const handleAddModel = () => {
  // Update the state with the new item
  postData([...models, newObject])
  alert("Thanks for creating a new model!")
  // Clear the input fields
  setNewModel({
    imgUrl: '',
    title: '',
    type: '',
   });
  setBlur(false)
};
//handle input
const handleChange = (e) => {
  const { name, value } = e.target;
  setNewModel({ ...newModel, [name]:value });
};

const [itemBlur, setBlur]= useState(false)
const handleBlur = () => {
  setBlur(true)
}

  return (
    <Box my="4rem" justifyContent="center">
      <VStack justifyContent="start">
      <Text as="h2" mb='2rem'>Your Models: {username}</Text>
      <SimpleGrid
      gridTemplateColumns="repeat(5,minmax(200px,1fr))"
      columns={{ md:2, lg:3, xl:4 }}
      gridGap={4}
      justifyContent='center'
      >
        {models.map((model) => (
          <ModelCard
          key={model.title}
          id={model.id}
          title={model.title}
          type={model.type}
          imgUrl={model.imgUrl}
          creator={model.creator}
          />
        ))}
      </SimpleGrid>
      <Container my='12' justifyContent='center' textAlign='center'>
          <Card p='4' boxShadow='2xl'>
            <Text as='h4'>Add New Model</Text>
            <form onSubmit={handleAddModel}>
              <VStack alignItems='start' px="6">
              <FormControl isInvalid={itemBlur && newModel.title === ""}>
                <FormLabel htmlFor="title">Title:</FormLabel>
                <Input
                id="title"
                type="text"
                name="title"
                value={newModel.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Enter a title model'
                />
                {handleBlur &&
                <FormErrorMessage>Please type a title</FormErrorMessage>
                }
              </FormControl>
              <FormControl isInvalid={itemBlur && newModel.type === ""} >
                <FormLabel htmlFor="type">Type:</FormLabel>
                <Select id="type" type="type" name="type" value={newModel.type} onChange={handleChange}  placeholder='Select a model type'>
                {modelTypes.map((type) => (
                    <option key={type.id}>{type.type}</option>
                  ))}
                </Select>
                {handleBlur &&
                <FormErrorMessage>Please select a model type</FormErrorMessage>
                }
              </FormControl>
              <FormControl isInvalid={itemBlur && newModel.imgUrl === ""}>
                <FormLabel htmlFor="title">Model:</FormLabel>
                <Input
                id="imgUrl"
                type="text"
                name="imgUrl"
                value={newModel.imgUrl}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Enter a model file'
                />
                {handleBlur &&
                <FormErrorMessage>Please upload a 3D model</FormErrorMessage>
                }
              </FormControl>
              <Button alignSelf='center' className='submit' my='2' w="50%" variant="button" type="submit">
                Submit Model
              </Button>
              </VStack>
            </form>
          </Card>
        </Container>
        </VStack>
    </Box>
  );
}

export default Profile