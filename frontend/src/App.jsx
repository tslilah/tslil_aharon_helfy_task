import { useEffect, useState } from "react";
import {
  getTasks,
  toggleTask,
  deleteTask,
  createTask,
  updateTask,
} from "./services/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Modal from "./components/Modal";
import "./styles/App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleToggle = async (id) => {
    try {
      const updatedTask = await toggleTask(id);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(taskToDelete.id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskToDelete.id)
      );

      setTaskToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, taskData);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTask.id ? updatedTask : task
          )
        );
      } else {
        const newTask = await createTask(taskData);

        setTasks((prevTasks) => [...prevTasks, newTask]);
      }

      handleCloseForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setIsFormOpen(false);
  };

  return (
    <div>
      <header className="header">
        <div>
          <h1>Task Management</h1>
          <p>Organize and track your tasks</p>
        </div>

        <button type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </header>
      {isFormOpen && (
        <Modal onClose={handleCloseForm}>
          <TaskForm editingTask={editingTask} onSubmit={handleFormSubmit} />
        </Modal>
      )}
      {taskToDelete && (
        <Modal onClose={cancelDelete}>
          <div className="delete-modal">
            <h2>Delete Task</h2>

            <p>Are you sure you want to delete "{taskToDelete.title}"?</p>

            <div className="delete-modal-actions">
              <button type="button" onClick={cancelDelete}>
                Cancel
              </button>

              <button type="button" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
