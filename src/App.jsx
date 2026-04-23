import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Counter from './components/Counter'
import RegisterForm from './components/RegisterForm'
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <>
      <Navbar />

      <header className="hero-section">
        <img src={heroImg} alt="ReelRemind hero" className="hero-image" />
        <h1>ReelRemind</h1>
        <p>
          Track upcoming movies and stay updated on release dates and ticket sale dates.
        </p>
      </header>

      <section className="movies-section">
        <h2>Popular</h2>

        <div className="container">

          {/* <div className='container'>
            <RegisterForm/>
          </div> */}
          
          <Card
            title="Spider-Man: Brand New Day"
            description="Release Date: July 31, 2026."
            p="Ticket Sale Date: TBD"
          />

          <Card
            title="Avengers: Doomsday"
            description="Release Date: December 18, 2026."
            p="Ticket Sale Date: TBD"
          />

          <Card
            title="The Batman Part II"
            description="Release Date: October 1, 2027."
            p="Ticket Sale Date: TBD"
          />
        </div>
      </section>

      <section className="account-section">
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