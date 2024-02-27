import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Container, Text, SimpleGrid, VStack, Box, FormLabel, Input, FormControl, FormErrorMessage, Button } from "@chakra-ui/react";
import { route } from '../App';
import { modelTypes } from './Gallery';

const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const { authState } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [models, setModels] = useState([]);
  const [listOfModels, setListOfModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchPost = async () => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/signin");
        } else {
          try {
            let response = await route.get(`/users/${id}`);
            setUsername(response.data.username);
          } catch (error) {
            console.log(error);
          }
          try {
            let response = await route.get('/models');
            setModels(response.data);
          } catch (error) {
            console.log(error);
          }
        }
      }
      fetchPost();
   }, [])

   const deleteModel = async (title) => {
    try {
      await route.delete(`/models/${title}`);
      setModels(
         models.filter((mod) => {
            return mod.title !== title;
         })
      );
    } catch (error) {
      console.log(error);
   }
 };
 // ADD model
 const [newModel, setNewModel] = useState({
  imgUrl: '',
  title: '',
  type: '',
});
// Image sample

const img = 'Assets/simonleeUnsplash.jpg'

// Create a new item object
const newObject = { title: newModel.title, type: newModel.type, imgUrl: newModel.imgUrl ?? img};
// POST Request
const postData = async () => {
  const postResponse = await route.post("/models",
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
      setFilters([postResponse.data, ...models])
    }
  })
  .catch((error) => {
      console.log(error);
  });
}

// Handle submit
const handleAddModel = () => {
  /* e.preventDefault() */
  // Update the state with the new item
  postData([...models, newObject])
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
//validation-blur
const [itemBlur, setBlur]= useState(false)
const handleBlur = () => {
  setBlur(true)
}

  return (
    <Container my="1rem">
      <Box>
        <Text>{username}</Text>
      </Box>
      <Text as="h1">All Models</Text>
      <SimpleGrid
        gridTemplateColumns="repeat(4,minmax(100px,1fr))"
        gridGap={4}
        justifyContent='center'
      >
        {models.map((mod) => (
          <Card
          key={mod.id}
          className='mainCard'
          >
            <VStack justifyContent='center'>
            <Text>Title: {mod.title}</Text>
            <Text>Type: {mod.type}</Text>
            <Button className="submit" ml='-9' onClick={() => deleteModel(mod.title)}>Delete</Button>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
      <Container my='24' justifyContent='center' textAlign='center'>
          <Card p='4' boxShadow='2xl'>
            <Text as='h4'>Add New Model</Text>
            <form onSubmit={handleAddModel}>
              <VStack alignItems='start'>
              <FormControl isInvalid={itemBlur && newModel.title === ""} isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
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
              <FormControl isInvalid={false} isRequired>
                <FormLabel htmlFor="type">Type:</FormLabel>
                <Select id="type" type="type" name="type" value={newModel.type} onChange={handleChange}     placeholder='Select a model type'>
                {modelTypes.map((type) => (
                    <option key={type.id}>{type.type}</option>
                  ))}
                </Select>
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <Button alignSelf='center' className='model-btn' my='2' type="submit">
                Submit Model
              </Button>
              </VStack>
            </form>
          </Card>
        </Container>
    </Container>
  );
}

export default Profile