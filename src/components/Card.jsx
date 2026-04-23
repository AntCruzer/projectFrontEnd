import { useState } from 'react';
import './Card.css';

function Card({
  title,
  description,
  extraText,
  showTrackButton = false
}) {
  const [tracked, setTracked] = useState(false);

  const handleTrackClick = () => {
    setTracked((prevState) => !prevState);
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>

      {extraText && <p>{extraText}</p>}

      {showTrackButton && (
        <button onClick={handleTrackClick}>
          {tracked ? 'Tracked' : 'Track Movie'}
        </button>
      )}
    </div>
  );
}

export default Card;
