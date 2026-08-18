import React from "react";

const TaskItem = ({ task }) => {
  return (
    <div>
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <span>{task.priority}</span>

      <p>{task.completed ? "Completed" : "Pending"}</p>
    </div>
  );
};

export default TaskItem;
