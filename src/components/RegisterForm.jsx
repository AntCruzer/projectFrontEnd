import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://practiceapp-kxv8.onrender.com';

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


// import { useState, useEffect } from 'react';
// import './RegisterForm.css';
// import Card from './Card';

// function RegisterForm() {

//     // STATE: OBJ TO STORE ALL FORM INPUT VALUES
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const [isLoginMode, setIsLoginMode] = useState(false); // Toggles Register vs Login
//     const [userList, setUserList] = useState([]); // Holds data from the API
//     const [isLoading, setIsLoading] = useState(false);  // Loading flag
    
//     // THIS FUNCTION RUNS WHEN THE USER TYPES INTO ANY INPUT
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         console.log("Target: ", e.target);
        
//        // UPDATE ONLY THE INPUT FIELD THAT CHANGED
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // STATE: LIVE PASSWORD FEEDBACK
//     const [message, setMessage] = useState('');

//     // RUN EVERY TIME PASSWORD VALUE CHANGES
//     useEffect(() => {

//         // SET A SMALL DELAY BEFORE CHECKING THE PASSWORD
//         const timer = setTimeout(() => {

//             // CASE 1: PASSWORD FIELD IS EMPTY, SHOW NO MESSAGE
//             if (formData.password.length === 0) {
//                 setMessage('');

//             // CASE 2: PASSWORD IS TOO SHORT, SHOW WARNING MESSAGE
//             } else if (formData.password.length < 5) {
//                 setMessage('Password is too short!');

//             // HAPPY PATH: SHOW POSITIVE FEEDBACK
//             } else {
//                 setMessage('Password looks good!');
//             }
//         }, 500);

//         // CLAER TIMER BEFORE RUNNING EFFECT AGAIN
//         return () => clearTimeout(timer);

//     }, [formData.password]);

    
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Stop the page from refreshing!
    
//         // Determine which Express route to hit
//         const endpoint = isLoginMode ? '/users/login' : '/users';
    
//         try {
//             setIsLoading(true);

//             // WHEN FOUND A HOST FOR FRONT ENDa
//             const response = await fetch(`https://YOUR_RENDER_URL${endpoint}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     name: formData.username, // Map React state to Express req.body
//                     email: formData.email,
//                     password: formData.password
//                 })
//              });
        
//             const data = await response.json();
        
//             if (!response.ok) throw new Error(data.error);

//             if (isLoginMode) {
//                 setMessage('Login Successful! Fetching users...');
//                 fetchSecureUsers(data.token); // Pass the JWT to our next function!
//             } else {
//                 setMessage('Registered! Please switch to Login.');
//             }
//         } catch (err) {
//             setMessage(`Error: ${err.message}`);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const fetchSecureUsers = async (token) => {
//         try {
//             setIsLoading(true);
//             const response = await fetch('https://YOUR_RENDER_URL/users', {
//                 method: 'GET',
//                 headers: { 
//                     'Authorization': `Bearer ${token}` // Present the JWT Bouncer pass!
//                 }
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUserList(data); // Save the users to state!
//             }
//         } catch (err) {
//             setMessage('Failed to load users.');
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     // Show loading message while fetch is retrieving data
//     if (isLoading) return <p>Loading...</p>;

//     // If we successfully fetched users, show the dashboard!
//     if (userList.length > 0) {
//         return (
//             <div className="register-container" style={{ maxWidth: '800px' }}>
//                 <h2>Secure User Dashboard</h2>
//                 <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//                     {userList.map((user) => (
//                         <Card key={user.id} title={user.name} description={user.email} />
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="register-container">

//                 {/* <h2>Register Here</h2> */}
//                 <h2>{isLoginMode ? 'Login Here' : 'Register Here'}</h2>

//                 <form onSubmit={handleSubmit} className='register-form'>

//                     <input
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         placeholder='Username'
//                         className='register-input'
//                     />

//                     <input
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder='Email'
//                         className='register-input'
//                     />

//                     <input
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder='Password'
//                         className='register-input'
//                     />

//                 </form>

//                 {/* SHOW PASSWORD MESSAGE WITH CONDITIONAL COLOR */}
//                 <p
//                     className='live-preview'
//                     style={{
//                         color: message === 'Password looks good!'
//                             ? 'lightgreen'
//                             : '#ff6b6b'
//                     }}
//                 >
//                     {message}
//                 </p>

//                 {/* LIVE PREVIEW OF THE USERNAME AS THE USER TYPES */}
//                 <p className='live-preview'>Live Preview: {formData.username}</p>
//                 <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
//                     Switch to {isLoginMode ? 'Register' : 'Login'}
//                 </button>
//             </div>
//         </>
//     );
// }

// export default RegisterForm;