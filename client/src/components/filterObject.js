import models from '../models.json'
import ModelCard from './ModelCard'
import { Box } from "@chakra-ui/react";

const Object = () => {
    // Filter objects
    const filter1 = models
      .filter((model) => model.type === 'object')
      .toSorted((a, b)=> a.title.localeCompare(b.title))
      .map(({...props}) => {
        return (
          <ModelCard
          {...props}
          />
        )
      })
    return (
        <Box
        direction="row"
        display="grid"
        gridTemplateColumns="repeat(4,minmax(0,1fr))"
        gridGap={8}
        mb={6}
        justifyContent='center'
        >
        {filter1}
        </Box>
    )
  }

  export default Object;