import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";
import TaskList from "./components/TaskList";
import "./styles/App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div>
      <header className="header">
        <div>
          <h1>Task Management</h1>
          <p>Organize and track your tasks</p>
        </div>
      </header>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default App;
