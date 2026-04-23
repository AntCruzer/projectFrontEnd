import { useState } from 'react'
import './Card.css'


function Card(props) {
  const [tracked, setTracked] = useState(false)


  // FUNCTION: TOGGLES TRACKED STATUS TO OTHER BINARY STATE
  function handleTrackClick() {
    setTracked(!tracked)
  }

  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>{props.releaseDate}</p>

      <button onClick={handleTrackClick}>
        {tracked ? 'Tracked' : 'Track Movie'}
      </button>
    </div>
  )
}

export default Card






// import './Card.css';

// function Card(props) {
//     return (
//         <>  
//             <div className='card'>
//                 <h3>{props.title}</h3>
//                 <p>{props.description}</p>
//                 <p>{props.p}</p>
                
//                 {/* ADD IMG OF MOVIE POSTER */}
                
//                 {/* EVENTUALLY WILL TAKE USER TO DEDICATED MOVIE PAGE */}
//                 <button>View Details</button>
//             </div>
//         </>
//     );
// }

// export default Card;