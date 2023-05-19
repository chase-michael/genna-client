import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductView from './components/ProductView';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Discover from './components/Discover';
const Pages = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductView />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/create-account' element={<CreateAccount />}/>
        <Route path='/discover' element={<Discover />}/>
    </Routes>
  )
}

export default Pages