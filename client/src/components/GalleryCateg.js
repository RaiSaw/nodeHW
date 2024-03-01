import React from 'react'
import { Box } from "@chakra-ui/react";
import '../App.css'

const GalleryCateg = () => {
  return (
    <Box mt={16}>
    <div className="container marketing">
      {/* <!-- Three columns of text below the carousel --> */}
      <div className="row">
        <div className="col-lg-4">
          <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="Assets/cdd20-9-dkDEXWGzI-unsplash.jpg" alt="Image credit: unsplash.com"/>
          <span className="sr-only">Image credit: unsplash.com</span>
          <h2 className="fw-normal">Challenges</h2>
          <p>perfect opportunity to practice, collaborate with others and create awesome projects</p>
          <p className="bt"><a className="btn btn-secondary" href="/">View more &raquo;</a></p>
        </div>
        <div className="col-lg-4">
          <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="Assets/amr-taha-qJit4JqiYLU-unsplash.jpg" alt="Image credit: unsplash.com"/>
          <span className="sr-only">Image credit: unsplash.com</span>
          <h2 className="fw-normal">IFCs</h2>
          <p>allows various software tools used in the AEC industry to exchange data seamlessly</p>
          <p className="bt"><a className="btn btn-secondary" href="/">View more &raquo;</a></p>
        </div>
        <div className="col-lg-4 justify-center">
          <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="Assets/simonleeUnsplash.jpg" alt="Image credit: unsplash.com"/>
          <span className="sr-only">Image credit: unsplash.com</span>
          <h2 className="fw-normal">Materials, Textures and HDRIs</h2>
          <p>components to enhance realism and visual appeal for architectural visualization or virtual scenes</p>
          <p className="bt"><a className="btn btn-secondary" href="/">View more &raquo;</a></p>
        </div>
      </div>
    </div>
    </Box>
  )
}

export default GalleryCateg;