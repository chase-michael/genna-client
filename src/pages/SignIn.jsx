import "../styles/social-icons.css";
import SignInForm from "../components/SignInForm";
import GoogleButton from 'react-google-button';

function SignIn() {
  return (
    <div className="SignIn">
      <SignInForm />
      <GoogleButton onClick={() => { console.log('Google button clicked') }}/>
    </div>
  );
}

export default SignIn;
