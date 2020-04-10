import React, { useState, useEffect } from "react";

import api from './services/api.js';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
    })

    const repository = response.data;

    setRepository([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO

    const response = await api.delete(`/repositories/${id}`, {
    })

    const repository = response.data;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);

    setRepository([...repositories, repository])



  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>)}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
