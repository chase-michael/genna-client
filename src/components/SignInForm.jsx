import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/authenticate-flow.css';
import UserInputContext from '../contexts/UserInputContext';
import { validateSignInInputs } from '../utils/authFormValidations';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { validateAuthToken } from '../utils/validateAuthToken';
import { Navigate } from 'react-router-dom';


function SignInForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userInput, setUserInput } = useContext(UserInputContext);
  const [invalidValues, setInvalidValues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      validateAuthToken().then(isValid => {
        if (isValid) {
          setIsAuthenticated(true);
        }
      }).catch(error => {
        console.error(error);
      });
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = userInput;

    const result = await validateSignInInputs(email, password);
    setInvalidValues(result);

    if (result.length == 0) {
      try {
        const response = await axios.post('http://localhost:3005/auth/signin', { email, password })
        const { authToken } = response.data;
        localStorage.setItem('authToken', authToken);
        setUserInput({
          displayName: '',
          email: '',
          password: '',
          profileImage: undefined
        })
        navigate('/');
  
      } catch (error) {
        setInvalidValues(error.response.data.errors);
      }
    }
  }

  return (
    <div className="authenticate">

      <div className="header">
        <img
          className="genna-helper"
          src={'/genna-logo.png'}
          alt="Genna"
          onClick={() => navigate('/')}
        />
        Sign In
      </div>

      <form
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userInput.email}
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
            autoComplete="email"
          />
          {invalidValues.find(error => error.email) && 
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle}/>
              {invalidValues.find(error => error.email).email}
            </div>
          }
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userInput.password}
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
            autoComplete="password"
          />
          {invalidValues.find(error => error.password) && 
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle}/>
              {invalidValues.find(error => error.password).password}
            </div>
          }
        </div>
        
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
        <div className="signin-create-row">
          <button type="submit">Sign In</button>
          <Link to="/create-account">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
