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
