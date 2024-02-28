import { Box, Tooltip, IconButton, Text, VStack, CardBody, Card, Button, useColorModeValue, Flex, ButtonGroup, useEditableControls, EditablePreview, Editable, EditableInput, Input, Select, useDisclosure, FormLabel, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, ModalFooter } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React, { useRef, useContext } from "react";
import {motion} from 'framer-motion'
import { defineStyle } from '@chakra-ui/react'
import { redirect, useNavigate, useParams } from "react-router-dom";
import '../App.css'

export const style = defineStyle({
  mb: '2',
  borderRadius: 'xl',
  fontWeight: 'semibold',
  color: 'white',
  fontSize: {
    md: '8',
    lg:'10',
  },
  textShadow: '1px 1px 1px mediumblue',
})

const ModelCard = ({title, imgUrl, type,  id, creator }) => {
  const navigate = useNavigate();
    return(
      <Box
      id='cont'
      borderRadius='xl'
      boxShadow='dark-lg'
      onClick={() => {
        navigate(`/model/${title}`);
      }}
      >
        <Card
        className="image"
        borderRadius='none'
        left={0}
        right={0}
        bg={`url(${imgUrl}) center/cover no-repeat`}
        textShadow='1px 1px #000'
        alt={`${title} image`}
        filter='auto'
        invert='8%'
        fontFamily={'Poppins'}
        px={2}
        pt={28}
        fontWeight='bold'
        >
        <CardBody pt={16} pb={4}>
          <VStack pt={16} alignItems='flex-start' color='white' h='100%' justifyContent='flex-end' fontSize={['8','9','11']}>{/* fontSize={['8','10','12']} */}
          <Text>{title}</Text>
          <Text>{creator}</Text>
          </VStack>
        </CardBody>
        </Card>
      </Box>
    )
}
export default ModelCard;
