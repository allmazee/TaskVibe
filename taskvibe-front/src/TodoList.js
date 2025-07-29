import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './utils/api';
import { format, differenceInDays } from 'date-fns';
import { FaArrowsAltV, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { removeToken } from './utils/auth';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const truncateDescription = (text, maxLength = 50) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text || '';
  };

  const getTaskAgeClass = (createdAt) => {
    if (!createdAt) return 'task-old';
    const ageInDays = differenceInDays(new Date(), new Date(createdAt));
    if (ageInDays < 1) return 'task-new';
    if (ageInDays <= 3) return 'task-medium';
    return 'task-old';
  };

  useEffect(() => {
    api.get('/todos')
      .then(response => {
        console.log('Fetched todos:', response.data);
        const sortedTodos = response.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setTodos(sortedTodos);
      })
      .catch(error => {
        console.error('Error fetching todos:', error.response || error);
        if (error.response?.status === 401) {
          removeToken();
          navigate('/signin');
        }
      });
  }, [navigate]);

  const handleAddTodo = () => {
    if (!title.trim()) return;
    api.post('/todos', { title, description })
      .then(response => {
        console.log('Added todo:', response.data);
        const newTodo = response.data;
        const updatedTodos = [...todos, newTodo].sort((a, b) => 
          sortOrder === 'asc' 
            ? new Date(a.createdAt) - new Date(b.createdAt) 
            : new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTodos(updatedTodos);
        setTitle('');
        setDescription('');
      })
      .catch(error => {
        console.error('Error adding todo:', error.response || error);
        if (error.response?.status === 401) {
          removeToken();
          navigate('/signin');
        }
      });
  };

  const handleDeleteTodo = (id) => {
    console.log('Attempting to delete todo with id:', id);
    api.delete(`/todos/${id}`)
      .then(response => {
        console.log('Deleted todo with id:', id, 'Response:', response);
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos.sort((a, b) => 
          sortOrder === 'asc' 
            ? new Date(a.createdAt) - new Date(b.createdAt) 
            : new Date(b.createdAt) - new Date(a.createdAt)
        ));
      })
      .catch(error => {
        console.error('Error deleting todo:', error.response || error);
        if (error.response?.status === 401) {
          removeToken();
          navigate('/signin');
        }
      });
  };

  const handleLogout = () => {
    removeToken();
    navigate('/signin');
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setTodos([...todos].sort((a, b) => 
      newSortOrder === 'asc' 
        ? new Date(a.createdAt) - new Date(b.createdAt) 
        : new Date(b.createdAt) - new Date(a.createdAt)
    ));
  };

  return (
    <div>
      <div className="form">
        <div className="header">
          <h2>My Tasks</h2>
          <button 
            onClick={handleLogout} 
            className="logout-button"
            title="Logout"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
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
        <button onClick={handleAddTodo}>Add Task</button>
      </div>
      <div className="list-container">
        <button 
          onClick={toggleSortOrder} 
          className="sort-button" 
          title={sortOrder === 'asc' ? 'Sort from newest to oldest' : 'Sort from oldest to newest'}
        >
          <FaArrowsAltV />
        </button>
        <ul className="task-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`task-item ${getTaskAgeClass(todo.createdAt)}`}>
              <Link to={`/todos/${todo.id}`} className="todo-link">
                <span className="task-title">{todo.title || 'No title'}</span>
                <span className="task-description">{truncateDescription(todo.description)}</span>
                <span className="created-at">
                  (Created: {todo.createdAt ? format(new Date(todo.createdAt), 'dd MMM yyyy, HH:mm') : 'N/A'})
                </span>
              </Link>
              <button 
                onClick={() => handleDeleteTodo(todo.id)} 
                className="delete-button"
                title="Delete"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;