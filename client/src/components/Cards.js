import { Text, VStack, CardBody, Card, HStack } from "@chakra-ui/react";
import React from "react";
import {motion} from 'framer-motion'
import '../App.css'


const Categories = ({ title, alt, imageSrc }) => {
    return(
        <Card
        as={motion.span}
        borderRadius="xl"
        boxShadow='dark-lg'
        left={0}
        right={0}
        mx={4}
        bg={`url(${imageSrc}) top/cover no-repeat`}
        textShadow='1px 1px #000'
        alt={alt}
        /* opacity='0.9'*/
        filter='auto'
        invert='8%'
        fontFamily={'Poppins'}
        px={6}
        /* hueRotate='-25deg'*/
        /* blur='0.5px' */
       /*  backdropFilter='auto'
        backdropBlur='12px' */
        /* backdropContrast='30%'*/
        /* Framer-motion */
        /*whileHover={{
          scale: 1.2,
          transition: { duration: 2 },
        }}*/
        //whileTap={{ scale: 1.5 }}
        //whileDrag={{ scale: 1.2 }}
        //whileFocus={{ scale: 2 }}
        >
        <CardBody py={6}>
        <VStack alignItems='flex-start' color='white' h='100%' justifyContent='space-between'>
          <Text as='h3' py={8} fontWeight='bold' fontSize={['8','16', '24']} /* position='absolute' */>{title}</Text>
          <HStack pt={8} justifyContent='space-between' width='100%' /*position='absolute'*/>
            <Text as='h5' fontWeight='semibold' fontSize={['8','12', '14']}>Categories</Text>
            <Text as='h5' fontWeight='semibold' fontSize={['8','12', '14']}>View All</Text>
          </HStack>
        </VStack>
          {/* <Image src={imageSrc} alt={alt} objectFit='cover' borderRadius="xl" height='100%' width='100%'/> */}
        </CardBody>
      </Card>
    )
}
export default Categories;
