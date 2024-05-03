"use client";
import React, { useState, useEffect } from "react";

const TaskList = () => {
  const initialTasks = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: false }
  ];
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskDescription.trim() === "") {
      return; 
    }

    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      description: newTaskDescription,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setNewTaskDescription("");
  };

  const handleInputChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleTaskClick = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleTaskEdit = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'active') {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="w-full max-w-md px-4 py-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">To-Do List</h1>
      <div className="mb-2">
        <button className="px-4 mr-2 py-2 bg-zinc-400 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-lg transition-shadow duration-300" onClick={() => setFilter('all')} style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}>All</button>
        <button className="px-4 mr-2 py-2 bg-zinc-400 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  hover:shadow-lg transition-shadow duration-300"onClick={() => setFilter('completed')} style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}>Completed</button>
        <button className="px-4 mr-2 py-2 bg-zinc-400 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  hover:shadow-lg transition-shadow duration-300"onClick={() => setFilter('active')} style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}>Active</button>
      </div>
      <div div className="flex items-center mb-6">
        <input
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          type="text"
          value={newTaskDescription}
          onChange={handleInputChange}
          placeholder="Enter new task description"
        />
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li
            className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-md hover:bg-blue-300 "
            style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'gray' : 'black',backgroundColor: task.completed ? 'lightgreen' : 'lightgray' }}
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
          >
            {editingTaskId === task.id ? (
              <input
                className="flex-1 px-4 py-2 rounded-l-md bg-gray-100 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={task.description}
                onChange={(e) => handleTaskEdit(task.id, e.target.value)}
                autoFocus
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setEditingTaskId(null);
                  }
                }}
              />
            ) : (
              <span>
                <> <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task.id)}
                />{task.description} </>
                <button
                  className="px-2 py-1 ml-10 text-red-500 hover:text-red-600 focus:outline-none"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
export default TaskList;
