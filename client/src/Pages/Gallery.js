import React, {useState, useEffect, useContext} from 'react'
import ModelCard from '../components/ModelCard'
import { Box, Text, Button, HStack, Select, SimpleGrid, VStack, Container, Card, FormLabel, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import GalleryCateg from '../components/GalleryCateg';
import Slider from '../components/Slider';
import { route, accts } from '../App';
import { AuthContext } from "../helpers/AuthContext";
import { redirect, useNavigate, useParams } from "react-router-dom";
import "../App.css";

const carousel = [
  {
    getImageSrc: () => require("../Assets/javier-miranda-bDFP8PxzW1Q-unsplash.jpg"),
    title: "Cosmic Worlds",
    alt:"outer space scene",
    description:"Have you ever wished to explore distant galaxies, uncover ancient civilizations, or bring your imagination to life?",
    href:"https://unsplash.com/@nuvaproductions?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  {
    getImageSrc: () => require("../Assets/birhat-jiyad-OMGORs5og5M-unsplash.jpg"),
    title: "Create with AI ✨",
    alt:"Cyborg model",
    description:"Explore and discover the perfect assets that will elevate your projects to new heights.",
    href:"https://unsplash.com/@birhatjiyad?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  {
    getImageSrc: () => require("../Assets/milad-fakurian-k4WPhf596b4-unsplash.jpg"),
    title: "Capture the World",
    alt:"nature scene",
    description:"Bring the real world into the digital realm and unlock a whole new dimension of creativity and imagination.",
    href:"https://unsplash.com/@fakurian?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
  }
]

export const modelTypes = [
  {
    type: 'object',
    id: 1
  },
  {
    type: 'scene',
    id: 2
  },
  {
    type: 'abstract',
    id: 3
  },
]

const Gallery = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const { authState } = useContext(AuthContext);
  const [models, setModels] = useState([]);

  const [filters, setFilters] = useState(models);

  useEffect(() => {
    fetchData();
  }, []);

  // GET Request
  const fetchData = async () => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signin");
    } else {
      try {
        let response = await route.get('/models');
        setModels(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

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

  // DELETE Request
  const deleteModel = async (title) => {
    try {
      const response = await route.delete(`/models/${title}`);
      setModels(
         models.filter((mod) => {
            return mod.title !== title;
         })
      )
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //EDIT model data
  const [edited, setEdited] = useState({
    title: models.title,
    type: models.type,
    imgUrl: models.imgUrl

  });
  const handleInput = (e) => {
    setEdited({...edited, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (title) => {
    const response = await route.patch(`/models/${title}`,
      edited,
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      setModels([response.data, ...models])
   })
   .catch((error) => {
      console.log(error);
   })
  }

  // PATCH Request - Chakra editable component
  const handleEditSubmit = async (title) => {
    try {
      const getResponse = await route.patch(`/models/${title}`,
      edited,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      )
        setFilters([response.data, ...models])
        setModels([response.data, ...models])
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
  setModels(sorted);
  setFilters(sorted)
  }

  /* Filtering function */
  const handleObject = () => {
    // Filter objects
    const filter = models.filter((model) => model.type === 'object')
    setModels(filter)
    setFilters(filter)
    console.log(filter)
  }

  const handleScene = () => {
    // Filter scenes
    const filter = models.filter((model) => model.type === 'scene')
    setModels(filter)
    setFilters(filter)
    console.log(filter)
  }

  const handleAbstract = () => {
    // Filter abstracts
    const filter = models.filter((model) => model.type === 'abstract')
    setModels(filter)
    setFilters(filter)
    console.log(filter)
  }
  return (
    <Box
    as="section"
    left={0}
    right={0}
    top={0}
    >

      <Slider data={carousel}/>
      <GalleryCateg/>
      <hr className="my-5"/>
      <Box>
        <div className="container justify-content-center flex col-lg-4 align-items-center" id="items">
          <div className="container my-4 flex col-lg-4" id="title">
            <Button as='h4' py={6} fontWeight='semibold' fontSize={['26','30','38']} onClick={() => fetchData()}>All Models</   Button>
            <HStack pb={8} >
              <Button className='model-btn' onClick={() => handleObject   ()}>Objects</Button>
              <Button className='model-btn' onClick={() => handleScene    ()}>Scenes</Button>
              <Button className='model-btn' onClick={() => handleAbstract()}>Abstracts</Button>
              <Button className='model-btn' onClick={() => handleSort   ()}>Sort by name</Button>
            </HStack>
          </div>
          <div className="d-flex flex-wrap my-4 flex col-lg-12 col-md-12 col-sm-8 justify-content-center justify-items-center align-items-center" id="container">
            <SimpleGrid
              gridTemplateColumns="repeat(3,minmax(200px,1fr))"
              columns={{ md:2, lg:3, xl:4}}
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
                //patch
                handleChangeTitle={handleChangeTitle}
                //put
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                setEdited={setEdited}
                edited={edited}
                deleteModel={deleteModel}
                />
            ))
            }
          </SimpleGrid>
          </div>
        </div>
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
      </Box>
    </Box>
    )
  }

export default Gallery