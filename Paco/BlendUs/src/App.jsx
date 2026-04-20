import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Show from './pages/Show'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed></Feed>}></Route>
          <Route path="/feed" element={<Feed></Feed>}></Route>
          <Route path="/explore" element={<Explore></Explore>}></Route>
          <Route path="/create" element={<Create></Create>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/edit" element={<Edit></Edit>}></Route>
          <Route path="/show" element={<Show></Show>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
