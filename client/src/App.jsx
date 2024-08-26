import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './Usercontext'; // Import UserContextProvider
import Layout from './Layout';
import IndexPage from './pages';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

function App() {
    return (
        <UserContextProvider>
            
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<IndexPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />
                </Route>
            </Routes>
           
        </UserContextProvider>
    );
}

export default App;
