import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Card from '../components/Card';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://practiceapp-kxv8.onrender.com/api';

function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load users');
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);

        if (
          err.message.toLowerCase().includes('token') ||
          err.message.toLowerCase().includes('forbidden')
        ) {
          localStorage.removeItem('token');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  if (isLoading) {
    return (
      <section className="dashboard-section">
        <h2>Secure User Dashboard</h2>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-section">
        <h2>Secure User Dashboard</h2>
        <p className="dashboard-error">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="dashboard-section">
      <h2>Secure User Dashboard</h2>
      <p className="dashboard-subtext">
        This page fetches protected user data using your JWT.
      </p>

      <div className="container">
        {users.map((user) => (
          <Card
            key={user.id}
            title={user.name}
            description={user.email}
            extraText={`User ID: ${user.id}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;

// import '../App.css';

// import Card from '../components/Card';

