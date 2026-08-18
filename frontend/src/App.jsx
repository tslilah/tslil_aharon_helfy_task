import { useEffect, useState } from "react";
import { getTasks } from "./services/taskService";

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

  if (tasks.length === 0) {
    return (
      <div>
        <h1>Task Manager</h1>
        <p>No tasks yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Task Manager</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.priority}</p>
          <p>{task.completed ? "Completed" : "Pending"}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
