import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
const localStorageKey = "todoApp";

const TodoUsingState = () => {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedTodos.length) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    const newName = todoNameRef.current.value;
    if (newName === "") return;
    setTodos([...todos, { id: nanoid(), name: newName, complete: false }]);
    todoNameRef.current.value = "";
  };

  const handleComplete = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleRemove = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  return (
      <div>
          <h1>Todo App using useState</h1>
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleRemove}>Remove Completed</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => handleComplete(todo.id)}
          />
          {todo.name}
        </div>
      ))}
    </div>
  );
};

export default TodoUsingState;
