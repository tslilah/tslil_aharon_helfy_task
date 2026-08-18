import React from "react";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-card-header">
        <h2>{task.title}</h2>

        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <p className="task-status">{task.completed ? "Completed" : "Pending"}</p>

      <div className="task-actions">
        <button
          type="button"
          className="toggle-button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Mark Pending" : "Mark Completed"}
        </button>

        <button type="button" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
