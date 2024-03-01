import React, {Suspense, createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Link, Image, ChakraProvider, extendTheme } from "@chakra-ui/react"
import reportWebVitals from './reportWebVitals';
import { switchTheme } from "./components/Switch.js";
import './index.css';
import dotenv from 'dotenv'
dotenv.config();

const theme = extendTheme({
  components: {
    Switch: switchTheme,
  }
});
export const ThemeContext = createContext(null);

function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <div className="link" style={{ position: 'absolute', bottom: 65, left: 150, fontSize: '1rem' }}>&copy; Bynd 2024</div>
      <div style={{ position: 'absolute', bottom: 40, left: 40 }}>
        <Link className="cont" boxShadow='dark-lg' to="/"><Image className='image' src="./Assets/bynd.png" alt="Logo" boxSize='80px' alignSelf="center"/></Link>
      </div>
    </div>
  )
}
export function SampleImages() {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      _Sample images credit: unsplash.com/artstation.com
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </ChakraProvider>
);

reportWebVitals();
