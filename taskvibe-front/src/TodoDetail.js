import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './utils/api';
import { format } from 'date-fns';
import { removeToken } from './utils/auth';

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ title: '', description: '', createdAt: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/todos/${id}`)
      .then(response => {
        console.log('Fetched todo:', response.data); // Логирование ответа
        setTodo(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todo:', error.response || error);
        if (error.response?.status === 401) {
          removeToken();
          navigate('/signin');
        } else {
          setError('Failed to load task');
          setIsLoading(false);
        }
      });
  }, [id, navigate]);

  const handleSave = () => {
    api.put(`/todos/${id}`, { title: todo.title, description: todo.description })
      .then(response => {
        console.log('Updated todo:', response.data); // Логирование обновления
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating todo:', error.response || error);
        if (error.response?.status === 401) {
          removeToken();
          navigate('/signin');
        } else {
          setError('Failed to update task');
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Task Details</h1>
      <div className="form">
        <input
          type="text"
          value={todo.title || ''}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={todo.description || ''}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          placeholder="Description"
        ></textarea>
        <div className="created-at">
          Created: {todo.createdAt ? format(new Date(todo.createdAt), 'dd MMM yyyy, HH:mm') : 'N/A'}
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => navigate('/')}>Back to Tasks</button>
      </div>
    </div>
  );
}

export default TodoDetail;