import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/authenticate-flow.css';
import UserInputContext from '../contexts/UserInputContext';
import ProfilePhotoUploader from './ProfilePhotoUploader';
import validateSignUpInputs from '../utils/validations/authValidations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

function CreateAccountForm() {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const [invalidValues, setInvalidValues] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { displayName, email, password } = userInput;

    const result = await validateSignUpInputs(displayName, email, password);
    console.log(result);
    setInvalidValues(result);

    if (result.length == 0) {
      try {
        const response = await axios.post('http://localhost:3005/auth/signup', { displayName, email, password })
        // const { token } = response.data;
  
        // localStorage.setItem('authToken', token);
        console.log(response.data);
        setUserInput({
          displayName: '',
          email: '',
          password: '',
          profileImage: undefined
        })
        navigate('/');
  
      } catch (error) {
        console.log(error.response.data.errors);
      }
    }
  }


  return (
    <div className="authenticate">
      <div className="header">
        <img
          className="genna-helper"
          src={"/genna-logo.png"}
          alt="Genna"
          onClick={() => navigate("/")}
        />
        Create Account
      </div>
      <form
        className="form"
        onSubmit={handleSubmit}
        noValidate  
      >

        <div>
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={userInput.displayName}
            onChange={(e) => {
              setUserInput({ ...userInput, displayName: e.target.value});
            }}
            required
          />
          {invalidValues.find(error => error.displayName) ? (
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle}/>
              {invalidValues.find(error => error.displayName).displayName}
            </div>
          ) : (
            <small>
              This is how you appear to others throughout the site. You can change this later.
            </small>
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
            required
            autoComplete='email'
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
            required
            autoComplete='password'
          />
          {invalidValues.find(error => error.password) && 
            <div className="error">
              <FontAwesomeIcon icon={faExclamationCircle}/>
              {invalidValues.find(error => error.password).password}
            </div>
          }
        </div>
        
        <ProfilePhotoUploader
          onChange={(imgURL) =>
            setUserInput({ ...userInput, profileImage: imgURL })
          }
        />
        <div>
          <button type="submit">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountForm;
