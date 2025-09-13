import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes,Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  const isAuthenticated = !!localStorage.getItem('token')



  return (
    <>
   <Routes>
    //public Routes
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/register" element = {<Register/>}/>
   </Routes>
   
    </>
  )
}

export default App
