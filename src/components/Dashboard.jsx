import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import handleSignOut from "../utils/handleSignOut";
import { validateAuthToken } from '../utils/validateAuthToken';

function Dashboard() {
	const navigate = useNavigate();
  
	useEffect(() => {
		if (localStorage.getItem('authToken')) {
			validateAuthToken().then(isValid => {
				if (!isValid) {
					navigate('/');
				}
			}).catch(error => {
				console.error(error);
			});
		} else {
			navigate('/');
		}
	}, []);

	return (
    <div>
      Dashboard
      <div onClick={() => handleSignOut(navigate)}>Sign Out</div>
    </div>
	)
}

export default Dashboard;