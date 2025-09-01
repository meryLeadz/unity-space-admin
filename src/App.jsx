import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HydraAdmin } from '@api-platform/admin';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import VerifyEmail from './VerifyEmail';
import ConfirmationPage from './confirmation-inscription';
import authProvider from './authProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage authProvider={authProvider} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-verify/:token" element={<VerifyEmail />} />
        <Route path="/confirmation-inscription" element={<ConfirmationPage />} />
        <Route path="/*" element={<HydraAdmin entrypoint="https://localhost:8000/api" authProvider={authProvider} />} />
      </Routes>
    </Router>
  );
}

export default App;
