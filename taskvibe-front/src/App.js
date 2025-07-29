import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import Signin from './Signin';
import Signup from './Signup';
import { isAuthenticated } from './utils/auth';
import './App.css';

// Компонент для защищённых маршрутов
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <Router>
      <div className="container">
        <h1>
          <a href="/" className="title-link">TaskVibe</a>
        </h1>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/todos/:id"
            element={
              <ProtectedRoute>
                <TodoDetail />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;