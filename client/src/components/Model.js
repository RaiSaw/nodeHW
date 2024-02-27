import React from 'react'

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  return (
    <div>
        <Text>Title:</Text>
          <Editable
          defaultValue={title}
          fontSize='md'
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          onSubmit={handleSubmit}
          value={edited.title}
          onChange=/* {handleInput} */{(newValue) => setEdited(newValue)}
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
          <Text>Type:</Text>
          <Editable
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          defaultValue={type}
          fontSize='sm'
          value={edited.type}
          onSubmit={handleSubmit}
          onChange={(newValue) => setEdited(newValue)}
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
        <Flex gap='4' justifyContent='center'>
          <Button className='edit-btn' m='2' onClick={onOpen}>Edit</Button>
          <Button className='edit-btn' m='2' onClick={() => deleteModel(title)}>Remove</Button>
        </Flex>
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
              <Input id="title" type="text" name="title" ref={initialRef} defaultValue={title}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select id="type" type="type" name="type" defaultValue={type}>
              {modelTypes.map((type) => (
                <option key={type.id}>{type.type}</option>
              ))}
            </Select>
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
    </div>
  )
}

export default Model