import { Link } from 'react-router-dom';
import '../App.css';
import heroImg from '../assets/hero.png';
import Card from '../components/Card';

function Home() {
  return (
    <>
      <header className="hero-section">
        <img src={heroImg} alt="ReelRemind hero" className="hero-image" />
        <h1>ReelRemind</h1>
        <p>
          Track upcoming movies and stay updated on release dates and ticket sale dates.
        </p>

        <div className="hero-actions">
          <Link to="/movies" className="hero-link">
            Browse Movies
          </Link>
          <Link to="/login" className="hero-link secondary-link">
            Login
          </Link>
        </div>
      </header>

      <section className="movies-section">
        <h2>Popular Upcoming Movies</h2>

        <div className="container">
          <Card
            title="Spider-Man: Brand New Day"
            description="Release Date: July 31, 2026"
            extraText="Search and import real TMDB movies from the Movies page."
          />

          <Card
            title="Avengers: Doomsday"
            description="Release Date: December 18, 2026"
            extraText="Use the Movies page to add titles into ReelRemind's local cache."
          />

          <Card
            title="The Batman Part II"
            description="Release Date: October 1, 2027"
            extraText="Imported movies will appear in the cached movies section."
          />
        </div>
      </section>
    </>
  );
}

export default Home;


// import { Link } from 'react-router-dom';
// import '../App.css';
// import heroImg from '../assets/hero.png';
// import Card from '../components/Card';

// function Home() {
//   return (
//     <>
//       <header className="hero-section">
//         <img src={heroImg} alt="ReelRemind hero" className="hero-image" />
//         <h1>ReelRemind</h1>
//         <p>
//           Track upcoming movies and stay updated on release dates and ticket sale dates.
//         </p>

//         <div className="hero-actions">
//           <Link to="/register" className="hero-link">
//             Get Started
//           </Link>
//           <Link to="/login" className="hero-link secondary-link">
//             Login
//           </Link>
//         </div>
//       </header>

//       <section className="movies-section">
//         <h2>Popular Upcoming Movies</h2>

//         <div className="container">
//           <Card
//             title="Spider-Man: Brand New Day"
//             description="Release Date: July 31, 2026"
//             extraText="Ticket Sale Date: TBD"
//             showTrackButton={true}
//           />

//           <Card
//             title="Avengers: Doomsday"
//             description="Release Date: December 18, 2026"
//             extraText="Ticket Sale Date: TBD"
//             showTrackButton={true}
//           />

//           <Card
//             title="The Batman Part II"
//             description="Release Date: October 1, 2027"
//             extraText="Ticket Sale Date: TBD"
//             showTrackButton={true}
//           />
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;
