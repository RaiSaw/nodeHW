import React, {useState, useContext, useRef}  from 'react'
import "../App.css";
import { Box, Button, HStack } from "@chakra-ui/react";
import { AuthContext } from "../helpers/AuthContext";
import * as THREE from 'three'
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber'
import { useFBO, useGLTF, useScroll, Text, Image, Scroll, Preload, ScrollControls, MeshTransmissionMaterial } from '@react-three/drei'
import { easing } from 'maath'
import { SampleImages } from '..';

const Home = () => {
  const { authState } = useContext(AuthContext);
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 15 }} >
      <ScrollControls damping={0.2} pages={3} distance={0.5}>
        <Lens>
          <Scroll>
            <Typography />
            <Images />
          </Scroll>
          <Scroll html>
          <SampleImages/>
            <Box style={{ transform: 'translate3d(65vw, 192vh, 0)' }}>
            <h5>
            From stunning visualizations to mind-bending designs,
            <br/>
            unleash your imagination and bring your ideas to life.
            </h5>
            <h5>
            No more barriers, no more limitations –
            <br/>
            immerse yourself in a world where imagination
            <br/>
            knows no bounds.
            </h5>
            <HStack spacing={8}>
                <Button as='a' href='/signup' className='submit' variant="button" w="50%">Sign up</Button>
                <Button as='a' href='/login' className="submit" w="50%">
                  Sign in
                </Button>
            </HStack>
            </Box>
          </Scroll>
          {/** This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
               By default threejs will only process objects if they are "seen" by the camera leading 
               to jank as you scroll down. With <Preload> that's solved.  */}
          <Preload />
        </Lens>
      </ScrollControls>
    </Canvas>
  )
}

export default Home

function Lens({ children, damping = 0.15, ...props }) {
  const ref = useRef()
  const { nodes } = useGLTF('/lens-transformed.glb')
  const buffer = useFBO()
  const viewport = useThree((state) => state.viewport)
  const [scene] = useState(() => new THREE.Scene())
  useFrame((state, delta) => {
    // Tie lens to the pointer
    // getCurrentViewport gives us the width & height that would fill the screen in threejs units
    // By giving it a target coordinate we can offset these bounds, for instance width/height for a plane that
    // sits 15 units from 0/0/0 towards the camera (which is where the lens is)
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15])
    easing.damp3(
      ref.current.position,
      [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
      damping,
      delta
    )
    // This is entirely optional but spares us one extra render of the scene
    // The createPortal below will mount the children of <Lens> into the new THREE.Scene above
    // The following code will render that scene into a buffer, whose texture will then be fed into
    // a plane spanning the full screen and the lens transmission material
    state.gl.setRenderTarget(buffer)
    state.gl.setClearColor('#d8d7d7')
    state.gl.render(scene, state.camera)
    state.gl.setRenderTarget(null)
  })
  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
      <mesh scale={0.25} ref={ref} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry} {...props}>
        <MeshTransmissionMaterial buffer={buffer.texture} ior={1.2} thickness={1.5} anisotropy={0.1} chromaticAberration={0.04} />
      </mesh>
    </>
  )
}

function Images() {
  const group = useRef()
  const data = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2
    group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3)
    group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3
  })
  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[4, height, 1]} url='/assets/milad-fakurian-k4WPhf596b4-unsplash.jpg' alt="Image credit: unsplash.com"/>
      <Image position={[2, 0, 3]} scale={3} url='/assets/birhat-jiyad-OMGORs5og5M-unsplash.jpg' alt="Image credit: unsplash.com"/>
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url='/assets/amr-taha-qJit4JqiYLU-unsplash.jpg' alt="Image credit: unsplash.com"/>
      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url='/assets/0176.png' />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url='/assets/rohit-choudhari-udrlQcvkckE-unsplash.jpg' alt="Image credit: unsplash.com"/>
      <Image position={[0, -height * 1.5, 7.5]} scale={[1.5, 3, 1]} url='/assets/simonleeUnsplash2.jpg' alt="Image credit: unsplash.com"/>
      <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height / 1.1, 1]} url='/assets/Characters2.png' alt="Image credit: artstation.com"/>
    </group>
  )
}
function Typography() {
  const state = useThree()
  const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12])
  const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.1, color: 'black', fontSize: 0.5 }
  return (
    <>
        <Text anchorX="left" position={[-width / 2.5, -height / 10, 12]} {...shared} >Step into</Text>
        <Text children="a world of" anchorX="right" position={[width / 2.5, -height * 2, 12]} {...shared} />
        <Text children="endless possibilities" position={[0, -height * 4.624, 12]} {...shared} />
    </>
  )
}
