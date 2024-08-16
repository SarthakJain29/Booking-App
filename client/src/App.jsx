import { Route, Routes } from 'react-router'
import './App.css'
import IndexPage from './pages'
import LoginPage from './pages/login'
import Layout from './Layout'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
      </Route>

    </Routes>

    
  )   
}

export default App
