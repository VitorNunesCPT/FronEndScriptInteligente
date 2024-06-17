import React, { useState, useEffect } from "react";
import {
  getAllScripts,
  updateScript,
  deleteScript,
} from "../services/userService";

interface Script {
  id: number;
  content: string;
  userId: number;
}

const ManageScripts: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [editScript, setEditScript] = useState<Script | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getAllScripts(token!);
        setScripts(response);
      } catch (error) {
        setErrorMessage("Erro ao buscar scripts.");
      }
    };
    fetchScripts();
  }, []);

  const handleEditScript = (script: Script) => {
    setEditScript(script);
  };

  const handleSaveScript = async () => {
    const token = localStorage.getItem("token");
    if (!token || !editScript) {
      setErrorMessage("Usuário não autenticado ou nenhum script selecionado.");
      return;
    }

    try {
      await updateScript(token, editScript.id.toString(), {
        content: editScript.content,
      });
      setSuccessMessage("Script atualizado com sucesso!");
      setEditScript(null);
      const response = await getAllScripts(token);
      setScripts(response);
    } catch (error) {
      setErrorMessage("Erro ao atualizar script.");
    }
  };

  const handleDeleteScript = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Usuário não autenticado.");
      return;
    }

    try {
      await deleteScript(token, id.toString());
      setSuccessMessage("Script deletado com sucesso!");
      const response = await getAllScripts(token);
      setScripts(response);
    } catch (error) {
      setErrorMessage("Erro ao deletar script.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Gerenciar Scripts</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {scripts.map((script) => (
          <li key={script.id}>
            <p>Conteúdo: {script.content}</p>
            <button onClick={() => handleEditScript(script)}>Editar</button>
            <button onClick={() => handleDeleteScript(script.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
      {editScript && (
        <div>
          <h2>Editar Script</h2>
          <label>
            Conteúdo:
            <textarea
              value={editScript.content}
              onChange={(e) =>
                setEditScript({ ...editScript, content: e.target.value })
              }
              rows={10}
              cols={50}
            />
          </label>
          <button onClick={handleSaveScript}>Salvar</button>
          <button onClick={() => setEditScript(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ManageScripts;
