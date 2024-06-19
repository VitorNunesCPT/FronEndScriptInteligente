import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bem-vindo ao Script Inteligente</h1>
      <div className="home-options">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Home;
