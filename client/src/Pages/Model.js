import React from 'react'
import { Box, Container} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { route } from '../App';
import "../App.css";


const Model = () => {
  const [model, setModel] = ({})
  let { title } = useParams();
  useEffect(() => {
      route.get(`/models/${title}`)
      .then((res) => {
          setModel(res.data)
      })
      .catch((error) => {
          console.log(error)
      })
  })
  return (
    <Box
      as="section"
      w={['80%', '100%', '100%']}
      left={0}
      right={0}
      margin='0 auto'
      height={700}
      bg='teal'
      alignContent='center'
      justifyContent='center'
      justifyItems='center'
      alignItems='center'
      justifySelf='center'
      alignSelf='center'
      >
      <Container maxWidth="1280px">
        <Card
        /* key={postModel.title} */
        className='card'
        >
          {title}
            <VStack justifyContent='center'>
            <Text>Title: {model.title}</Text>
            <Text>Type: {model.type}</Text>
            {/* <Button className="submit" ml='-9' onClick={() => deleteModel(post.title)}>Delete</Button> */}
            </VStack>
        </Card>
      </Container>
    </Box>
  )
}

export default Explore