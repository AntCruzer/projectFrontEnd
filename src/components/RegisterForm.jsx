import { useState, useEffect } from 'react';
import './RegisterForm.css';

function RegisterForm() {

    // STATE: OBJ TO STORE ALL FORM INPUT VALUES
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    // STATE: LIVE PASSWORD FEEDBACK
    const [message, setMessage] = useState('');

    // RUN EVERY TIME PASSWORD VALUE CHANGES
    useEffect(() => {

        // SET A SMALL DELAY BEFORE CHECKING THE PASSWORD
        const timer = setTimeout(() => {

            // CASE 1: PASSWORD FIELD IS EMPTY, SHOW NO MESSAGE
            if (formData.password.length === 0) {
                setMessage('');

            // CASE 2: PASSWORD IS TOO SHORT, SHOW WARNING MESSAGE
            } else if (formData.password.length < 5) {
                setMessage('Password is too short!');

            // HAPPY PATH: SHOW POSITIVE FEEDBACK
            } else {
                setMessage('Password looks good!');
            }
        }, 500);

        // CLAER TIMER BEFORE RUNNING EFFECT AGAIN
        return () => clearTimeout(timer);

    }, [formData.password]);

    
    // THIS FUNCTION RUNS WHEN THE USER TYPES INTO ANY INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log("Target: ", e.target);

        // UPDATE ONLY THE INPUT FIELD THAT CHANGED
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="register-container">

                <h2>Register Here</h2>

                <form className='register-form'>

                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Username'
                        className='register-input'
                    />

                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        className='register-input'
                    />

                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        className='register-input'
                    />

                </form>

                {/* SHOW PASSWORD MESSAGE WITH CONDITIONAL COLOR */}
                <p
                    className='live-preview'
                    style={{
                        color: message === 'Password looks good!'
                            ? 'lightgreen'
                            : '#ff6b6b'
                    }}
                >
                    {message}
                </p>

                {/* LIVE PREVIEW OF THE USERNAME AS THE USER TYPES */}
                <p className='live-preview'>
                    Live Preview: {formData.username}
                </p>

            </div>
        </>
    );
}

export default RegisterForm;


// import { useState, useEffect } from 'react';
// import './RegisterForm.css';

// function RegisterForm() {

//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const [message, setMessage] = useState('');

//     useEffect(() =>{

//         const timer = setTimeout(() => {
//             if(formData.password.length === 0) {
//                 setMessage('');
//             } else if(formData.password.length < 5) {

//                 setMessage('Passowrd is too short!');
//             }
//             else {
//                 setMessage('Password looks good!');
//             }
//         }, 500)

//         return () => clearTimeout(timer);

//     }, [formData.password]);

//     // FUNCTION: HANLDES STATE CHNAGES TO THE REGISTER FORM
//     const handleChange = (e) => {
//         const { name, value} = e.target;
//         console.log("Target: ", e.target);
//         setFormData(prevState => ({

//            ...prevState,
//            [name]: value

//         }));
//     }

//     return (
//         <>
//             <div className="register-container">

//                 <h2>Register Here</h2>
//                 <form className='register-form'>

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

//                 <p className='live-preview' style={{color: message === 'Password looks good!' 
//                 ? 'lightgreen' : '#ff6b6b'}}>
//                     {message}
//                 </p>

//                 <p className='live-preview'>Live Preview: {formData.username}</p>

//             </div>
//         </>
//     );
// }

// export default RegisterForm;