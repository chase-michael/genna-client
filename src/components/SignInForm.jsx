import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from '../styles/authenticate-forms.module.css';
import UserInputContext from '../contexts/UserInputContext';
import { AuthContext } from '../contexts/AuthContext';
import { validateSignInInputs } from '../utils/authFormValidations';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { validateAuthToken } from '../utils/validateAuthToken';


function SignInForm() {
  const location = useLocation();
  const notification = location.state?.notification;
  const next = location.state?.next ? location.state.next : '/dashboard';
  const { userInput, setUserInput } = useContext(UserInputContext);
  const { authToken, signIn } = useContext(AuthContext);
  const [invalidValues, setInvalidValues] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = userInput;
  
    const result = await validateSignInInputs(email, password);
    setInvalidValues(result);
  
    if (result.length == 0) {
      try {
        const response = await axios.post('http://localhost:3005/auth/signin', { email, password })
        const { authToken } = response.data;
        signIn(authToken);
        setUserInput({
          displayName: '',
          email: '',
          password: '',
          profileImage: undefined
        })
        navigate(next ? next : '/');
      } catch (error) {
        setInvalidValues(error.response.data.errors);
      }
    }
  }

  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, []);
  
  return (
    <div className={styles.content}>
      <main className={styles.authenticate}>
        <div className={styles.header}>
          <h1 className={styles.mainHeader}>
            Sign In
          </h1>
          {notification &&
            <p className={styles.error}>
              <FontAwesomeIcon icon={faExclamationCircle}/>
              {notification}
            </p>
          }
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >

          <div className={styles.emailInput}>
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
              <div className={styles.error}>
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
              <div className={styles.error}>
                <FontAwesomeIcon icon={faExclamationCircle}/>
                {invalidValues.find(error => error.password).password}
              </div>
            }
          </div>
          
          <Link to="/forgot-password" className={styles.forgotPasswordLink}>
            Forgot Password?
          </Link>
          <div className={styles.signInCreateRow}>
            <button type="submit">Sign In</button>
            <Link
              to="/create-account"
              state={ { next }}
              className={styles.caLink}
            >
              Create Account
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignInForm;
