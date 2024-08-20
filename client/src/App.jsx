import { Route, Routes } from 'react-router'
import './App.css'
import IndexPage from './pages'
import LoginPage from './pages/login'
import Layout from './Layout'
import RegisterPage from './pages/register'
import axios from 'axios'


axios.defaults.baseURL = 'http://localhost:4000';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Route>

    </Routes>

    
  )   
}

export default App
