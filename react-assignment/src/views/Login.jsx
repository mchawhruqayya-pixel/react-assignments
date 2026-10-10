import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? <LoginForm /> : <RegisterForm />}
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin
          ? 'Need an account? Register'
          : 'Already have an account? Login'}
      </button>
    </>
  );
};

export default Login;
