import "./App.css";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

function App() {
  const [filter, setFilter] = useState("all");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      content: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTask("");
    console.log(task);
    console.log(tasks);
  }

  function handleRemoveTask(id) {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  }

  function handleDeleteAll() {
    setTasks([]);
  }

  function handleEditTask(id, newContent) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, content: newContent } : task
    );
    setTasks(updatedTasks);
  }

  function handleToggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
  }

  function getFilteredTasks() {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }

  return (
    <div>
      <h1>Kratos Task Organizer</h1>
      <input
        type="text"
        placeholder="Insert your task"
        className="user-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />{" "}
      <button onClick={handleAddTask}>Add Task</button>{" "}
      {tasks.length >= 2 && (
        <button onClick={handleDeleteAll}>Delete All</button>
      )}
      <ul>
        {getFilteredTasks().map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={handleRemoveTask}
            onEdit={handleEditTask}
            onToggle={handleToggleTask}
          />
        ))}
      </ul>
      {tasks.length > 0 && (
        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
      )}
    </div>
  );
}

export default App;
