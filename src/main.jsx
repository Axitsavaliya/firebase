import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Signin from './Signin.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path="/signin" element={<Signin />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
