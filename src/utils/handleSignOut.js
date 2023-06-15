import { useNavigate } from 'react-router-dom';

function handleSignOut(navigate) {
    if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken');
        navigate('/');
        window.scrollTo(0, 0);
    }
}

export default handleSignOut;