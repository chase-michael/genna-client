import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/authenticate-flow.css';
import UserInputContext from '../contexts/UserInputContext';

function SignInForm() {
  const { userInput, setUserInput } = useContext(UserInputContext);
  const navigate = useNavigate();

  return (
    <div className="authenticate">
      <div className="header">
        <img
          className="genna-helper"
          src={"/genna-logo.png"}
          alt="Genna"
          onClick={() => navigate("/")}
        />
        Sign In
      </div>
      <form
        className="form"
      >
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
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password
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
