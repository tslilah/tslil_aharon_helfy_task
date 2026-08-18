import { useEffect, useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = ({ editingTask, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }

    setFormError("");
  }, [editingTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setFormError("Title is required");
      return;
    }

    setFormError("");

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>

      {formError && <p className="form-error">{formError}</p>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          rows="4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
