function handleSignOut(navigate) {
    if (localStorage.getItem('authToken')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        navigate('/');
    }
}

export default handleSignOut;