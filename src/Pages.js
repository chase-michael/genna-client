import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Work from './components/Work';
import Discover from './components/Discover';
import ArtistProfile from './components/ArtistProfile';
import Dashboard from './components/Dashboard';
import UploadWorkForm from './components/dev/UploadWorkForm';
import CreateMenu from './components/create/CreateMenu';
import TextToImageController from './components/create/TextToImageController';
import SearchResults from './components/SearchResults';
import LearnMore from './components/LearnMore';
import SignInForm from './components/SignInForm';
import CreateAccountForm from './components/CreateAccountForm';
import GuidedByAiController from './components/create/GuidedByAiController';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:id" element={<ArtistProfile />} />
      <Route path="/work/:id" element={<Work />} />
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/create" element={<CreateMenu />} />
      <Route path="/create/text-to-image" element={<TextToImageController />} />
      <Route path="/create/guided-by-ai" element={<GuidedByAiController />} />
      <Route path="/create-account" element={<CreateAccountForm />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/devUploadWork" element={<UploadWorkForm />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/learn-more" element={<LearnMore />} />
    </Routes>
  )
}

export default Pages;