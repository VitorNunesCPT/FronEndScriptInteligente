import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/employeeDashboard.css';

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo ao Painel do Funcionário</h1>
      <div className="dashboard-options">
        <button onClick={() => navigate('/edit-profile')}>Alterar Dados do Perfil</button>
        <button onClick={() => navigate('/user-dashboard')}>Corrigir Script</button>
        <button onClick={() => navigate('/view-user-scripts')}>Visualizar Script do Usuário</button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
