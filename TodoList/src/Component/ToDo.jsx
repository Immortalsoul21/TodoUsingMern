/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import todo from "../../src/Assets/todo_icon.png";
import ToDoItems from "./TodoItems";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:9000/todos"); // Replace with your API endpoint
        setTodos(response.data);
      } catch (error) {
        setError("Error fetching todos");
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const add = async () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };

    try {
      const response = await axios.post("http://localhost:9000/todos", newTodo); // sending to server at port 9000 not db at 8000
      setTodos((prev) => [...prev, response.data]);
      inputRef.current.value = "";
    } catch (error) {
      setError("Error adding todo");
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      
      await axios.delete(`http://localhost:9000/todos/${id}`); 
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setError("Error deleting todo");
      console.error("Error deleting todo:", error);
    }
  };

  const toggle = async (id) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    try {
      const response = await axios.put(`http://localhost:9000/todos/${id}`, {
        ...todo,
        isCompleted: !todo.isCompleted,
      }); 
      setTodos((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      setError("Error toggling todo");
      console.error("Error toggling todo:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* Header */}
      <div className="flex items-centre mt-7 gap-2">
        <img className="w-8" src={todo} alt="Todo Icon" />
        <h1 className="text-3xl">Todo List</h1>
      </div>
      {/* Input */}
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add Todo"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          ADD
        </button>
      </div>
      {/* Todo List */}
      <div>
        {todos.map((item) => (
          <ToDoItems
            key={item.id}
            todo={item}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
