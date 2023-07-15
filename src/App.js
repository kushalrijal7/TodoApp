import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      if (editTodoId) {
        // Update existing todo
        const updatedTodos = todos.map((todo) => {
          if (todo.id === editTodoId) {
            return { ...todo, text: inputValue };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setEditTodoId(null);
      } else {
        // Add new todo
        const newTodo = {
          id: Date.now(),
          text: inputValue,
        };
        setTodos([...todos, newTodo]);
      }

      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id, text) => {
    setEditTodoId(id);
    setInputValue(text);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo}>{editTodoId ? 'Update' : 'Add'}</button>

      <ul className='list__item'>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id === editTodoId ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            ) : (
              todo.text
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => editTodo(todo.id, todo.text)}>
              {editTodoId === todo.id ? 'Cancel' : 'Edit'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;