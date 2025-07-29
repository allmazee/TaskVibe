import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './utils/api';
import { format } from 'date-fns';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/todos/${id}`)
      .then(response => {
        console.log('Fetched todo:', response.data);
        setTodo(response.data);
        setTitle(response.data.title || '');
        setDescription(response.data.description || '');
      })
      .catch(error => {
        console.error('Error fetching todo:', error.response || error);
        setError('Failed to load task');
        if (error.response?.status === 401) {
          navigate('/signin');
        }
      });
  }, [id, navigate]);

  const handleSave = () => {
    console.log('Attempting to update todo:', { id, title, description });
    api.put(`/todos/${id}`, { title, description })
      .then(response => {
        console.log('Updated todo:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating todo:', error.response || error);
        setError('Failed to update task');
        if (error.response?.status === 401) {
          navigate('/signin');
        }
      });
  };

  if (!todo && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="created-at">
          Created: {todo.createdAt ? format(new Date(todo.createdAt), 'dd MMM yyyy, HH:mm') : 'N/A'}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleSave}>Save</button>
        <button onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}

export default TodoDetail;