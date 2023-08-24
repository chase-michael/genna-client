import { useContext } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import Pages from "./Pages";
import Navbar from "./components/Navbar";
import { AuthContext } from './contexts/AuthContext';

const MainContent = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className={'main-content'}>
      {children}
    </div>
  );
}

function App() {
  const { authToken } = useContext(AuthContext);
  return (
    <HashRouter>
      <Navbar key={authToken} />
      <MainContent>
        <Pages />
      </MainContent>
    </HashRouter>
  );
}

export default App;
