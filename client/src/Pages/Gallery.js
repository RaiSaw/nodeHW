import React, {useState, useEffect, useContext} from 'react'
import ModelCard from '../components/ModelCard'
import { Box, Text, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import GalleryCateg from '../components/GalleryCateg';
import Slider from '../components/Slider';
import { route } from '../App';
import { redirect, useNavigate, useParams } from "react-router-dom";
import "../App.css";


const carousel = [
  {
    getImageSrc: () => require("../Assets/javier-miranda-bDFP8PxzW1Q-unsplash.jpg"),
    title: "Cosmic Worlds",
    alt:"https://unsplash.com/@nuvaproductions?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    description:"Have you ever wished to explore distant galaxies, uncover ancient civilizations, or bring your imagination to life?",
    href:"https://unsplash.com/@nuvaproductions?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  {
    getImageSrc: () => require("../Assets/birhat-jiyad-OMGORs5og5M-unsplash.jpg"),
    title: "Create with AI ✨",
    alt:"https://unsplash.com/@birhatjiyad?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    description:"Explore and discover the perfect assets that will elevate your projects to new heights.",
    href:"https://unsplash.com/@birhatjiyad?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  {
    getImageSrc: () => require("../Assets/milad-fakurian-k4WPhf596b4-unsplash.jpg"),
    title: "Capture the World",
    alt:"https://unsplash.com/@fakurian?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
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
  const navigate = useNavigate();

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
        setFilters(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  /* Sorting function */
  const handleSort = () => {
  const sorted = filters.toSorted((a, b)=> a.title.localeCompare(b.title))
  setFilters(sorted)
  }

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
    <Box
    as="section"
    left={0}
    right={0}
    top={0}
    mb={12}
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
          {!filters ?
          (
            <SimpleGrid
              gridTemplateColumns="repeat(4,minmax(200px,1fr))"
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
                creator={model.creator}
                />
              ))}
            </SimpleGrid>
          ):(
            <SimpleGrid
              gridTemplateColumns="repeat(4,minmax(200px,1fr))"
              columns={{ md:2, lg:3, xl:4}}
              gridGap={4}
              justifyContent='center'
             >
              {filters.map((model) => (
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
          )
          }
          </div>
        </div>
      </Box>
      <Text fontSize="11px" bottom={3} right={5}>_Sample images credit: unsplash.com/artstation.com</Text>
    </Box>
    )
  }

export default Gallery