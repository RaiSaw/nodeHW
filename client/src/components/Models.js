import React, {useState, useEffect} from 'react'
import { Box, Text, Button, HStack, Select, SimpleGrid, VStack, Container, Card, FormLabel, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import ModelCard from './ModelCard'
import { modelTypes } from "../Pages/Gallery";
/* import axios from 'axios' */
import '../App.css'
/* import model from '../models.json'  import {Bmodels} from '../models'*/
//import Object from './filterObject';
//import { useForm } from 'react-hook-form'

const Models = ({mock}) => {
  // states
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState(models);

  console.log(models)

  // GET Request
  const fetchData = async () => {
    try {
    const getResponse = await mock.get("")
      setModels(getResponse.data)
      setFilters(getResponse.data)
    } catch (err) {
      console.log(`Error: ${err.emssage}`)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE Request
  const deleteData = async (id) => {
  try {
    await mock.delete(`${id}`)
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
    setModels(models.filter((model) => model.id !== id))
  }

  /* REMOVE Model
  const deleteData = async (idToRemove) => {
    await mock.delete(`/models/${idToRemove}`)
    //Create a new array without the item to be removed just in state
    const removed = models.filter((model) => model.id !== idToRemove);
    setModels(removed);
    console.log(removed)
    .then(response => console.log(response))
    .catch(err => console.log(err.message))
  };
  */

  // ADD model
  const [newModel, setNewModel] = useState({
     id: null,
     title: '',
     type: '',
  });
  // Image sample
  const img = 'Assets/simonlee_unsplash2.jpg'
  // Generate ID
  const newId = Math.max(...models.map((model) => model.id), 0) + 1;
  /* const newId = models.length + 1 */
  // Create a new item object
  const newObject = { title: newModel.title, id: newId, type: newModel.type, imgUrl: img };

  // POST Request
  const postData = async () => {
    const postResponse = await mock.post("", newObject )
    setModels([postResponse.data, ...models])
    setFilters([postResponse.data, ...models])
    //((prev)=>[postResponse.data, ...prev])
  }
  // Handle submit
  const handleAddModel = (e) => {
    e.preventDefault()
    // Update the state with the new item
    /* setModels([...models, newObject]); */
    postData([...models, newObject])
    // Clear the input fields
    setNewModel({
      id: null,
      title: '',
      type: '',
      /* imgUrl: '', */
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

  //EDIT model data
  const [edited, setEdited] = useState({
    title: models.title,
    type: models.type,
  });
  const handleInput = (e) => {
    setEdited({...edited, [e.target.name]: e.target.value})
  }
  const handleSubmit = async (id) => {
    const response = await mock.patch(`${id}`, {edited})
    .then(response => console.log(response))
    .catch(err => console.log(err.message))
    setModels([...models, edited])
  }
  const [editTitle, setEditTitle] = useState(models.title);
  const updateTitle = { title: editTitle};
  // PATCH Request 1
  const editData = async (id) => {
    try {
      const response = await mock.patch(`${id}`, updateTitle)
      setModels([response.data, ...models])
      /* setFilters([response.data, ...models]) */
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
  // PATCH Request - Chakra editable component
  const handleEditSubmit = async (id) => {
    try {
      const getResponse = await mock.patch(`${id}`)
        /* setFilters(getResponse.data) */
    } catch (err) {
        console.log(`Error: ${err.emssage}`)
    }
  }
  // handle submit
  const handleEdit = (e) => {
    e.preventDefault()
    //call editAxiosfunc here
  }

  const handleChangeTitle = (e) => {
    setEditTitle(e.target.value)
  }

  /* Sorting function */
  const handleSort = () => {
  const sorted = models.toSorted((a, b)=> a.title.localeCompare(b.title))
  setFilters(sorted);
  /* console.log(sorted) */
  }
  /* Toggle */
  /* const [toggle, setToggle] = useState(false);
  const toggleButton = () => {
    setToggle(!toggle);
  }; */

  /* Filtering function */
  const handleObject = () => {
    // Filter objects
    const filter = models.filter((model) => model.type === 'object')
    setFilters(filter)
    console.log(filter)
  }

  const handleScene = () => {
    // Filter scenes
    const filter = models.filter((model) => model.type === 'scene')
    setFilters(filter)
    console.log(filter)
  }

  const handleAbstract = () => {
    // Filter abstracts
    const filter = models.filter((model) => model.type === 'abstract')
    setFilters(filter)
    console.log(filter)
  }

  return (
  <Box>
    <div className="container justify-content-center align-items-center" id="items">
      <div className="container my-4 flex col-lg-4" id="title">
        <Button as='h4' py={6} fontWeight='semibold' fontSize={['26','30','38']} onClick={() => fetchData()}>All Models</Button>
        <HStack pb={8}>
          <Button className='model-btn' onClick={() => handleObject()}>Objects</Button>
          <Button className='model-btn' onClick={() => handleScene()}>Scenes</Button>
          <Button className='model-btn' onClick={() => handleAbstract()}>Abstracts</Button>
          <Button className='model-btn' onClick={() => handleSort()}>Sort by name</Button>
        </HStack>
      </div>
      <div className="d-flex flex-wrap my-4 flex col-lg-12 justify-center" id="container">
        <SimpleGrid
          gridTemplateColumns="repeat(3,minmax(200px,1fr))"
          columns={{md:2, lg:3, xl:4}}
          gridGap={4}
          justifyContent='center'
         >
          {filters.map((model) => (
            <ModelCard
            key={model.id}
            id={model.id}
            title={model.title}
            type={model.type}
            imgUrl={model.imgUrl}
            //patch
            deleteData={deleteData}
            handleChangeTitle={handleChangeTitle}
            editData={editData}
            //put
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            setEdited={setEdited}
            edited={edited}
            />
        ))
        }
      </SimpleGrid>
      </div>
    </div>
    <Container my='12' justifyContent='center' textAlign='center'>
      <Card p='2' boxShadow='2xl'>
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
            /* {...register('title', {
              required: 'Title is required',
            })} */
            />
            {handleBlur &&
            <FormErrorMessage>Please type a title</FormErrorMessage>
            }
          </FormControl>
          <FormControl isInvalid={false} isRequired>
            <FormLabel htmlFor="type">Type:</FormLabel>
            <Select id="type" type="type" name="type" value={newModel.type} onChange={handleChange} placeholder='Select a model type'>
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
  </Box>
  )
}

export default Models;