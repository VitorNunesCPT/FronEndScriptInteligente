import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  updateUser,
  updateUserRole,
} from "../services/userService";

interface User {
  id: number;
  username: string;
  role: string;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getAllUsers(token!);
        setUsers(response);
      } catch (error) {
        setErrorMessage("Erro ao buscar usuários.");
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setEditUser(user);
  };

  const handleSaveUser = async () => {
    const token = localStorage.getItem("token");
    if (!token || !editUser) {
      setErrorMessage("Usuário não autenticado ou nenhum usuário selecionado.");
      return;
    }

    try {
      await updateUser(token, editUser.id.toString(), editUser);
      setSuccessMessage("Informações do usuário atualizadas com sucesso!");
      setEditUser(null);
      const response = await getAllUsers(token);
      setUsers(response);
    } catch (error) {
      setErrorMessage("Erro ao atualizar usuário.");
    }
  };

  const handleRoleChange = async (userId: number, role: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Usuário não autenticado.");
      return;
    }

    try {
      await updateUserRole(token, userId.toString(), role);
      setSuccessMessage("Permissão do usuário atualizada com sucesso!");
      const response = await getAllUsers(token);
      setUsers(response);
    } catch (error) {
      setErrorMessage("Erro ao atualizar permissão do usuário.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Gerenciar Usuários</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Nome: {user.username}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => handleEditUser(user)}>Editar</button>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
            >
              <option value="USER">Usuário</option>
              <option value="EMPLOYEE">Funcionário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </li>
        ))}
      </ul>
      {editUser && (
        <div>
          <h2>Editar Usuário</h2>
          <label>
            Nome:
            <input
              type="text"
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />
          </label>
          <button onClick={handleSaveUser}>Salvar</button>
          <button onClick={() => setEditUser(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
