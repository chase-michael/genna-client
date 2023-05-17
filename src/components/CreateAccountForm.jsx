import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authenticate-flow.css';
import UserInputContext from '../contexts/UserInputContext';
import ProfilePhotoUploader from './ProfilePhotoUploader';
import axios from 'axios';

function CreateAccountForm() {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const { displayName, email, password } = userInput;

    try {
      const response = await axios.post('http://localhost:3005/auth/signup', { displayName, email, password })
      const { token } = response.data;

      localStorage.setItem('authToken', token);
      console.log(response.data);

    } catch (error) {
      console.error(error);
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
      >
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
        <small>
          This is how you appear to others throughout the site. You can
          change this later.
        </small>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={userInput.email}
          onChange={(e) =>
            setUserInput({ ...userInput, email: e.target.value })
          }
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={userInput.password}
          onChange={(e) =>
            setUserInput({ ...userInput, password: e.target.value })
          }
          required
        />
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
