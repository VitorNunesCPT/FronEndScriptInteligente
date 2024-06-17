import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/userService";
import "../styles/adminDashboard.css";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Bem-vindo ao Painel do Administrador</h1>
      <button onClick={() => navigate("/edit-profile")}>
        Alterar Dados do Perfil
      </button>
      <button onClick={() => navigate("/user-dashboard")}>
        Submissão de Script
      </button>
      <button onClick={() => navigate("/view-user-scripts")}>
        Visualizar Script do Usuário
      </button>
      <button onClick={() => navigate("/configure-integrations")}>
        Configurar Integrações do Sistema
      </button>
      <button onClick={() => navigate("/manage-users")}>
        Gerenciar todos os perfis
      </button>
      <button onClick={() => navigate("/manage-scripts")}>
        Supervisionar todas as submissões
      </button>
      <button onClick={() => navigate("/audit-activities")}>
        Auditar Atividades do Sistema
      </button>
      <button onClick={() => navigate("/system-maintenance")}>
        Backup e Manutenção do Sistema
      </button>
    </div>
  );
};

export default AdminDashboard;
