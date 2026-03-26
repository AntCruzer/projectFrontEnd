import './Card.css';

function Card(props) {
    return (
        <>  
            <div className='card'>
                <h3>{props.title}</h3>
                <p>{props.description}</p>
                <p>{props.p}</p>
                
                {/* ADD IMG OF MOVIE POSTER */}
                
                {/* EVENTUALLY WILL TAKE USER TO DEDICATED MOVIE PAGE */}
                <button>View Details</button>
            </div>
        </>
    );
}

export default Card;