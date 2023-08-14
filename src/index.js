import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { UserInputProvider } from './contexts/UserInputContext';
import { AuthProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserInputProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserInputProvider>
);
