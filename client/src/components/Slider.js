import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box, Text, Image, Button } from "@chakra-ui/react";
import '../App.css'

function Slider(props) {
  return (
    <Box
    mt={-24}
    >
      <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      >
        {props.data.map((carousel) => (
          <div key={carousel.title}>
          <div className="carousel-item active">
          <a className="img-cont" href={carousel.href}><Image className="img-fluid sm-w-300 sm-h-300" src={carousel.getImageSrc()} alt={carousel.alt}/></a>
          <div className="container">
            <div className="carousel-caption text-start">
              <Text as='h3' mb={4}>{carousel.title}</Text>
              <Text as='h3' mb={6} fontSize={['14','16','20']}className="opacity-75">{carousel.description}</Text>
              <Button className="submit" variant="button" href="/" w="15%">Learn more</Button>
            </div>
          </div>
        </div>
        </div>
        ))}
      </Carousel>
    </Box>
  );
}
export default Slider;