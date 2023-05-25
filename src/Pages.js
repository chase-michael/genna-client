import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WorkView from './components/WorkView';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Discover from './components/Discover';
import ArtistProfile from './components/ArtistProfile';

const Pages = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<ArtistProfile />} />
        <Route path='/work/:id' element={<WorkView />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/discover' element={<Discover />} />
    </Routes>
  )
}

export default Pages