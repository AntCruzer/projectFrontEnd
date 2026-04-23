import '../App.css';
import RegisterForm from '../components/RegisterForm';

function Login() {
  return (
    <section className="account-section">
      <h2>Login</h2>

      <div className="container">
        <RegisterForm mode="login" />
      </div>
    </section>
  );
}

export default Login;


// import '../App.css';

// import RegisterForm from '../components/RegisterForm';

// function Login() {


//     return (
//         <>  
//         <div className='container'>
//             <RegisterForm/>
//           </div>
//         </>
//     )
// }


// export default Login;