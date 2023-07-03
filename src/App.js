import React from "react";
import { BrowserRouter, useLocation } from 'react-router-dom';
import Pages from "./Pages";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; 
function App() {
  return (
    <BrowserRouter>
      <ConditionalNavbar />
      <ScrollToTop/> 
      <Pages />
    </BrowserRouter>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const excludedRoutes = ['/sign-in', '/create-account', '/complete-your-profile', '/'];

  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}

export default App;
