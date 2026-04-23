import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://practiceapp-kxv8.onrender.com/api';

function RegisterForm({ mode = 'register' }) {
  const navigate = useNavigate();
  const isLoginMode = mode === 'login';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoginMode) {
      return;
    }

    const timer = setTimeout(() => {
      if (formData.password.length === 0) {
        setMessage('');
      } else if (formData.password.length < 5) {
        setMessage('Password is too short!');
      } else {
        setMessage('Password looks good!');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.password, isLoginMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

    const payload = isLoginMode
      ? {
          email: formData.email,
          password: formData.password
        }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };

    try {
      setIsLoading(true);
      setMessage('');

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      if (isLoginMode) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        navigate('/dashboard');
      } else {
        setMessage('Registration successful! Please log in.');
        setFormData({
          name: '',
          email: '',
          password: ''
        });
        navigate('/login');
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const messageClassName = message.startsWith('Error')
    ? 'form-message error-message'
    : 'form-message success-message';

  return (
    <div className="register-container">
      <h2>{isLoginMode ? 'Login Here' : 'Register Here'}</h2>

      <form onSubmit={handleSubmit} className="register-form">
        {!isLoginMode && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
            className="register-input"
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="register-input"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="register-input"
        />

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading
            ? 'Please wait...'
            : isLoginMode
            ? 'Login'
            : 'Register'}
        </button>
      </form>

      {message && <p className={messageClassName}>{message}</p>}

      {!isLoginMode && (
        <p className="live-preview">Live Preview: {formData.name || 'Your username will appear here'}</p>
      )}

      <button
        type="button"
        className="mode-button"
        onClick={() => navigate(isLoginMode ? '/register' : '/login')}
      >
        Switch to {isLoginMode ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

export default RegisterForm;