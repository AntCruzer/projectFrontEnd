import heroImg from './assets/hero.png'

import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Counter from './components/Counter'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <>
      <Navbar />

      <header className="hero-section">
        <img src={heroImg} alt="ReelRemind hero image" className="hero-image" />
        <h1>ReelRemind</h1>
        <p>
          Track upcoming movies and stay updated on release dates and ticket sale dates.
        </p>
      </header>

      <section>
        <h2>Followed Movies</h2>

        <div className="container">
          <Card
            title="Spider-Man: Brand New Day"
            description="Release Date: July 31, 2026"
            p= "Ticket Sale Begins: TBD"
          />
          <Card
            title="Avengers: Doomsday"
            description="Release Date: December 18, 2026."
            p="Ticket Sale Begins: TBD"
          />
          <Card
            title="The Batman Part II"
            description="Release Date: October 1, 2027"
          />
        </div>
      </section>

      <section>
        <h2>Create Your Account</h2>

        <div className="container">
          <RegisterForm />
        </div>
      </section>

      <footer className="app-footer">
        <h2>Movies Tracked</h2>
        <Counter />
      </footer>
    </>
  )
}

export default App

// import { useState } from 'react'

// // MIGHT NOT NEED THESE
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'


// import './App.css'
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import Counter from './components/Counter';
// import RegisterForm from './components/RegisterForm';


// function App() {

//   // NOT IN EXAMPLE REPO
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Navbar />
//       <h1>Hello, Friend!</h1>

//       <div className='container'>
//         <Card title='Product 1' description="peepee"/>
//         <Card title='Product 2' description="poopoo"/>
//         <Card title='Product 3' description="peepoo"/>
//       </div>

//       <div className ='container'>
//         <RegisterForm/>
//       </div>

//       <footer className="app-footer">
//         <Counter/>
//       </footer>
      
//       {
        
//       }
//     </>
//   )
// }

// export default App
