import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userHome.css";

const UserHome: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div className="user-home-container">
      <h2>Bem-vindo, {username}</h2>
      <div className="home-options">
        <button onClick={() => navigate("/edit-profile")}>
          Alterar Dados do Perfil
        </button>
        <button onClick={() => navigate("/user-dashboard")}>
          Submissão de Script
        </button>
      </div>
    </div>
  );
};

export default UserHome;
