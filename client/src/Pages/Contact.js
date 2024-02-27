import React from 'react'
import { Box, Container, Flex, CloseButton} from "@chakra-ui/react";
import "./Contact.css";

const Contact = () => {
  return (
    <Flex py={12} height={750} align='center' justify='center'>
    <Box
      as="section"
      w={['100%', '100%', '100%']}
      left={0}
      right={0}
      alignContent='center'
      justifyContent='center'
      >
      <Container maxWidth="1280px">
      <div className="mx-6 px-12 text-white col-sm-6 col-md-6 col-lg-6 py-6 justify-items-center align-items-center" id="card-Contact">
        <div className="flex justify-end">
            <CloseButton size='md' /* ml={260} */
            as='a'
            href='/'
            variant='solid'
            aria-label='Close icon'
            color="white"
            id='x'
            />
        </div>
        <div className="title">
            <h1 className="text-xl my-4" id='contact-title'>Contact us</h1>
            <span>
                <i className="fa-solid fa-envelope"></i>
            </span>
        </div>
        <p id='contact-p' className="text-base mb-4">We'd love to hear from you.<br />Please drop your name, email and message.</p>
        <form id='contactForm' action="#" method="POST">
            <label className='label-contact' htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
            <label className='label-contact' htmlFor="email">Email:</label>
            <input type="email" id="emailContact" name="email" placeholder="Enter your email" required />
            <label className='label-contact' htmlFor="message">Message:</label>
            <textarea className="text-black" id="message" name="message" rows="4" placeholder="Enter your message" required></textarea>
            {/* <!-- <input type="submit" value="Submit"/> --> */}
            <button id="btn-contact" type="submit" className="btn btn-primary px-4 m-2 me-md-2 fw-bold" style={{backgroundColor: 'blue'}}>Submit</button>
        </form>
        <div className="space-x-8 my-6 flex justify-center">
            <a className="socials" href="linkedin.com"><i className="fa-brands fa-linkedin"></i></a>
            <a className="socials" href="instagram.com"><i className="fa-brands fa-instagram"></i></a>
            <a className="socials" href="discord.com"><i className="fa-brands fa-discord"></i></a>
        </div>
      </div>
      </Container>
      </Box>
      </Flex>
  )
}

export default Contact