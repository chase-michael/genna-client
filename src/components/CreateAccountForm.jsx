import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/authenticate-forms.module.css';
import UserInputContext from '../contexts/UserInputContext';
import { AuthContext } from '../contexts/AuthContext';
import ProfileImageInput from './ProfileImageInput';
import { validateCreateAccountInputs } from '../utils/authFormValidations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { validateAuthToken } from '../utils/validateAuthToken';

function CreateAccountForm() {
  const location = useLocation();
  const next = location.state?.next;
  const { userInput, setUserInput } = useContext(UserInputContext);
  const { authToken, signIn } = useContext(AuthContext);
  const [invalidValues, setInvalidValues] = useState([]);
  const [submitIntents, setSubmitIntents] = useState(0);
  const navigate = useNavigate();


  async function handleSubmit(event) {
    
    setSubmitIntents(submitIntents + 1);
    event.preventDefault();
    const { displayName, email, password, profileImage } = userInput;
    const result = await validateCreateAccountInputs(displayName, email, password, profileImage);
    setInvalidValues(result);

    if (result.length == 0) {
      try {
        if (result.length == 0) {
          let formData = new FormData();
          formData.append('displayName', displayName);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('profileImage', profileImage);
          const config = {     
              headers: { 'content-type': 'multipart/form-data' }
          }
          const response = await axios.post('http://localhost:3005/auth/createAccount', formData, config)

        const { authToken } = response.data;
        signIn(authToken);
        setUserInput({
          displayName: '',
          email: '',
          password: '',
          profileImage: undefined
        })
        navigate(next ? next : '/');
      }
    } catch (error) {
        console.log(error);
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
        <h1 className={styles.createAccountHeader}>
          Create Account
        </h1>

        <form
          className={`${styles.form} ${styles.caForm}`}
          onSubmit={handleSubmit}
          noValidate  
        >

          <div>
            <ProfileImageInput
              onChange={(img) =>
                setUserInput({ ...userInput, profileImage: img })
              }
            />
            {invalidValues.find(error => error.profileImage) && 
              <div className={styles.error}>
                <FontAwesomeIcon icon={faExclamationCircle}/>
                {invalidValues.find(error => error.profileImage).profileImage}
              </div>
            }
          </div>

          <div>
            <label htmlFor="displayName">Name</label>
            <input
              type="text"
              id="displayName"
              value={userInput.displayName}
              onChange={(e) => {
                setUserInput({ ...userInput, displayName: e.target.value});
              }}
            />
            {invalidValues.find(error => error.displayName) ? (
              <div className={styles.error}>
                <FontAwesomeIcon icon={faExclamationCircle}/>
                {invalidValues.find(error => error.displayName).displayName}
              </div>
            ) : (
              submitIntents < 2 &&
              <div className={styles.displayNameMessage}>
                This is how you appear to others throughout the site. You can change it later.
              </div>
            )}
          </div>
          
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
              required
              autoComplete="password"
            />
            {invalidValues.find(error => error.password) && 
              <div className={styles.error}>
                <FontAwesomeIcon icon={faExclamationCircle}/>
                {invalidValues.find(error => error.password).password}
              </div>
            }
          </div>

          <div>
            <button className={`${styles.cabutton} ${styles.caSubmit}`} type="submit">
              Create Account
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateAccountForm;
