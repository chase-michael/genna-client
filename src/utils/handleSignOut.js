import { useNavigate } from 'react-router-dom';

function handleSignOut(navigate) {
    localStorage.removeItem('authToken');
    navigate('/');
    window.scrollTo(0, 0);
}

export default handleSignOut;