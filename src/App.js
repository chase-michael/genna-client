import { useContext } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Pages from "./Pages";
import Navbar from "./components/Navbar";
import { AuthContext } from './contexts/AuthContext';

const MainContent = ({ children }) => {
  const location = useLocation();
  const pathName = location.pathname;
  
  return (
    <div className={'main-content'}>
      {children}
    </div>
  );
}

function App() {
  const { authToken } = useContext(AuthContext);
  
  return (
    <BrowserRouter>
      <Navbar key={authToken} />
      <MainContent>
        <Pages />
      </MainContent>
    </BrowserRouter>
  );
}

export default App;
