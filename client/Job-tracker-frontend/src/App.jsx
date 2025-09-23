import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { HashRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Addjob from './Components/jobs/Addjob'
import Updatejob from './Components/jobs/Updatejob'
import LandingPage from './pages/Landingpage'

function App() {
  const [count, setCount] = useState(0)

  const isAuthenticated = !!localStorage.getItem('token')



  return (
    <>
        <HashRouter>
   <Routes>
    //public Routes
    <Route path = "/" element = {<LandingPage/>}/>
    <Route path ="/login" element ={<Login/>}/>
    <Route path = "/register" element = {<Register/>}/>
    //private Routes
    <Route path = "/home" element ={isAuthenticated ?<Home/> :<Login/>}/>
    <Route path="/addjob" element ={isAuthenticated ?<Addjob/>:<Login/>}/>
    <Route path="/updatejob/:id" element ={isAuthenticated ?<Updatejob/>:<Login/>}/>
   </Routes>
   </HashRouter>
   
    </>
  )
}

export default App
