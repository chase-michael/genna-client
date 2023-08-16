import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { UserInputProvider } from './contexts/UserInputContext';
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserInputProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserInputProvider>
);
