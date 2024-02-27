import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { route } from '../Lens';


const Params = () => {
    const [postModel, setPostModel] = ({})
    let { title } = useParams();
    useEffect(() => {
        route.get(`/models/${title}`)
        .then((res) => {
            setPostModel(res.data)
        })
        .catch((error) => {
            console.log(error)
        })
    })

  return (
    <div>
        <Card
        /* key={postModel.title} */
        className='card'
        >
            <VStack justifyContent='center'>
            <Text>Title: {postModel.title}</Text>
            <Text>Type: {postModel.type}</Text>
            {/* <Button className="submit" ml='-9' onClick={() => deleteModel(post.title)}>Delete</Button> */}
            </VStack>
          </Card>
    </div>
  )
}

export default Params