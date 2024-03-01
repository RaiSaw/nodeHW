import React, {useEffect, useState, useRef} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { route } from '../App';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Tooltip, IconButton, Text, VStack, CardBody, Card, Button, useColorModeValue, Flex, ButtonGroup, useEditableControls, EditablePreview, Editable, EditableInput, Input, Select, useDisclosure, FormLabel, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, ModalFooter, Container } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { modelTypes } from './Gallery';
import '../App.css'
import {Formik} from 'formik'


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
  const navigate = useNavigate();
  const username = localStorage.getItem("username")
  const [model, setModel] = useState({
    title: "",
    type: "",
    imgUrl: "",
    creator: username
  })
  let { title } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signin");
    }
    route.get(`/models/${title}`)
    .then((res) => {
        setModel({
          title: res.data.title,
          type: res.data.type,
          imgUrl: res.data.imgUrl,
          creator: username
        })
    })
    .catch((error) => {
        console.log(error)
    })
}, [])
console.log(model)

//EDIT model data
const updateModel = {
  title: model.title,
  type: model.type,
  imgUrl: model.imgUrl,
  creator: username
}

const handleInput = (e) => {
  setModel({...model, [e.target.name]: e.target.value})
}
const onSubmit = async (title, type, imgUrl, option) => {
    const getResponse = await route.patch(`/models/${title}`,
    {
      title: model.title,
      type: model.type,
      imgUrl: model.imgUrl,
      creator: username
    },
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
    )
    console.log("Model title updated!")
    setModel({...model, [e.target.name]: e.target.value})
  }

// PATCH Request - Chakra editable component
const [newTitle, setNewTitle] = useState(model.title)
const [edit, setEdit] = useState(model.type)

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
      alert("Model title updated!")
  } catch (err) {
      console.log(`Error: ${err.emssage}`)
  }
}

console.log(newTitle)

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
    alert("Model type updated!")
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
    }
    )
      setModel("")
      alert("Model deleted!")
      navigate("/profile")
  } catch (error) {
    console.log(error);
 }
};
  return (
    <Box>
      <Flex justifyContent="flex-start">
        <ArrowBackIcon
        boxSize={5}
        onClick={()=>navigate('/profile')}
        variant='solid'
        aria-label='Back icon'
        m={8}
        className='icon'
        />
      </Flex>
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
      id="img-3d"
      >
        <CardBody pt={16} pb={4} >
          <VStack pt={16} alignItems='flex-start' color='white' h='100%' justifyContent='flex-end' fontSize={['8','9','11']}>
            <Text>{model.title}</Text>
            <Text>{model.type}</Text>
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
          <Formik
          initialValues={updateModel}
          onSubmit={onSubmit}
          >
          <form>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
              id="title"
              type="text"
              name="title"
              ref={initialRef}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select
              id="type"
              type="type"
              name="type"
              >
              {modelTypes.map((type) => (
                <option key={type.id}>{type.type}</option>
              ))}
            </Select>
            </FormControl>
            <FormControl>
              <FormLabel>File</FormLabel>
              <Input
              id="imgUrl"
              type="text"
              name="imgUrl"
              />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button className='submit' type="submit" variant="100%" w="20%" mr={3}>
              Save
            </Button>
            <Button className="edit-btn"onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
          </Formik>
        </ModalContent>
      </Modal>
      </VStack>
        </CardBody>
      </Card>
      {model.creator ?
        (
          <Flex mt="4" justifyContent='center' border="2px solid" borderRadius="0 1rem">
            <Button className='submit' w="25%" variant="button" m='2' onClick={onOpen}>Edit</Button>
            <Button className='edit-btn' m='2' onClick={() => deleteModel(title)}>Remove</Button>
          </Flex>
        ):(
          <Flex justifyContent="center" mt="4" border="2px solid" borderRadius="0 1rem">
            <VStack p={4}>
            <Text textShadow="1px 1px 1px white">{model.title}</Text>
            <Text textShadow="1px 1px 1px white">{model.type}</Text>
            <Text textShadow="1px 1px 1px white">{model.creator}</Text>
            </VStack>
          </Flex>
        )
      }
      </Box>
      </Flex>
    </Box>
  )
}
export default Model