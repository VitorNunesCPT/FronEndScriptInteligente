import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../styles/userHome.css";

interface DecodedToken {
  username: string;
  // Adicione outras propriedades do token, se necessário
}

const UserHome: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div className="user-home-container">
      <h2>Bem-vindo, {username}</h2>
      <button onClick={() => navigate("/edit-profile")}>
        Alterar Dados do Perfil
      </button>
      <button onClick={() => navigate("/user-dashboard")}>
        Submissão de Script
      </button>
    </div>
  );
};

export default UserHome;
