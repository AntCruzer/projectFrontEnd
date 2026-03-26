import './Navbar.css';

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <h2>ReelRemind</h2>
                <ul>
                    <li>Home</li>
                    <li>Upcoming</li>
                    <li>Watchlist</li>
                    <li>Sign Out</li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;