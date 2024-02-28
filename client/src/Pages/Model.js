import React, {useEffect, useState, useRef} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { route } from '../App';
import "../App.css";
import { Box, Tooltip, IconButton, Text, VStack, CardBody, Card, Button, useColorModeValue, Flex, ButtonGroup, useEditableControls, EditablePreview, Editable, EditableInput, Input, Select, useDisclosure, FormLabel, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, ModalFooter } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { modelTypes } from './Gallery';
import '../App.css'


const EditableControls =  () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
  } = useEditableControls()

  return isEditing ? (
    <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton
        icon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : null;
}

const Model = () => {
  const [model, setModel] = useState([])
  let { title } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const username = localStorage.getItem("username")

  useEffect(() => {
    route.get(`/models/${title}`)
    .then((res) => {
        setModel(res.data)
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error)
    })
}, [])

  //EDIT model data
const [newTitle, setNewTitle] = useState(model.title)
const [edit, setEdit] = useState(model.type)


const handleInput = (e) => {
  setEdit({...edit, [e.target.name]: e.target.value})
}
/* title: model.title,
  type: model.type,
  imgUrl: model.imgUrl,
  creator: model.creator ?? username */

const handleTitle = async (title) => {
  try {
    const getResponse = await route.patch(`/models/${title}`,
    {
      title: newTitle
    },
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
    )
      console.log("Model title updated!")
  } catch (err) {
      console.log(`Error: ${err.emssage}`)
  }
}

// PATCH Request - Chakra editable component
const handleType = async (title) => {
  try {
    const getResponse = await route.patch(`/models/${title}`,
    {
      type: edit
    },
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
    )
    console.log("Model type updated!")
  } catch (err) {
      console.log(`Error: ${err.emssage}`)
  }
}
 //DELETE
 const deleteModel = async (title) => {
  try {
    await route.delete(`/models/${title}`,
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    });
      console.log("Model deleted!")
      setModel(model.filter((mod) => mod.title !== title))
      setInterval(() => {
        navigate("/profile")
      }, 5000);
  } catch (error) {
    console.log(error);
 }
};
  return (
    <Flex align='center' justify='center' h="100%">
      <Box
      className='login'
      as='section'
      color="#333"
      maxWidth="1280px"
      left={0}
      right={0}
      rounded='xl'
      border= 'none'
      py="8"
      >
      <Card
      className="cardMain"
      boxShadow="2xl"
      bg={`url(../${model.imgUrl}) center/cover no-repeat`}
      textShadow='1px 1px #000'
      alt={`${model.title} image`}
      filter='auto'
      invert='8%'
      fontFamily={'Poppins'}
      fontWeight='bold'
      >
        <CardBody pt={16} pb={4} >
          <VStack pt={16} alignItems='flex-start' color='white' h='100%' justifyContent='flex-end' fontSize={['8','9','11']}>
          <Editable
          defaultValue={model.title}
          fontSize='md'
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          onSubmit={handleTitle}
          value={newTitle}
          onChange={(newValue) => setNewTitle(newValue)}
          >
          <Tooltip label="Click to edit" shouldWrapChildren={true}>
          <EditablePreview
            px={2}
            _hover={{
              background: useColorModeValue("gray.600", "gray.700")
            }}
          />
          </Tooltip>
            <Input
            as={EditableInput}
            name='title'
            id='title'
            />
            <EditableControls/>
          </Editable>
          <Editable
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          defaultValue={model.type}
          fontSize='sm'
          value={edit}
          onSubmit={handleType}
          onChange={(newValue) => setEdit(newValue)}
          >
          <Tooltip label="Click to edit" shouldWrapChildren={true}>
          <EditablePreview
            px={2}
            _hover={{
              background: useColorModeValue("gray.600", "gray.700")
            }}
          />
          </Tooltip>
          <EditableInput
          as={Select}
          name='type'
          id='type'
          >
            {modelTypes.map((opt) =>(
              <option key={opt.id}>{opt.type}</option>
            ))}
          </EditableInput>
            <EditableControls/>
          </Editable>
        <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false} /* scroll body even not in focus */
        /* closeOnOverlayClick={true} */
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit model</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input id="title" type="text" name="title" ref={initialRef} defaultValue={model.title}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select id="type" type="type" name="type" defaultValue={model.type}>
              {modelTypes.map((type) => (
                <option key={type.id}>{type.type}</option>
              ))}
            </Select>
            </FormControl>
            <FormControl>
              <FormLabel>File</FormLabel>
              <Input id="imgUrl" type="text" name="imgUrl" ref={initialRef} defaultValue={model.imgUrl}/>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button id="signup-btn" mr={3}>
              Save
            </Button>
            <Button className="edit-btn"onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </VStack>
        </CardBody>
      </Card>
      {model.creator ?
        (
          <Flex my="2" justifyContent='center' border="2px solid" borderRadius="0 1rem">
              <Button className='edit-btn' m='2' onClick={onOpen}>Edit</Button>
              <Button className='edit-btn' m='2' onClick={() => deleteModel(title)}>Remove</Button>
            </Flex>
        ):(
          <Flex justifyContent="center" my="2" border="2px solid" borderRadius="0 1rem">
            <VStack p={4}>
            <Text textShadow="1px 1px 1px white">{model.title}</Text>
            <Text textShadow="1px 1px 1px white"t>{model.type}</Text>
            <Text textShadow="1px 1px 1px white">{model.creator}</Text>
            </VStack>
          </Flex>
        )
      }
      </Box>
    </Flex>
  )
}
export default Model