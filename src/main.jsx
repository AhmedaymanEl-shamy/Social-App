import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from "@heroui/react";
import '../node_modules/flowbite/dist/flowbite.min.js'


createRoot(document.getElementById('root')).render(
  
    <HeroUIProvider>
    <App />
    </HeroUIProvider>
  
)
