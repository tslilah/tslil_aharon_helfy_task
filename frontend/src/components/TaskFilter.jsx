import "../styles/TaskFilter.css";

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <div className="task-filter">
      <button
        type="button"
        className={filter === "all" ? "active" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>

      <button
        type="button"
        className={filter === "completed" ? "active" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>

      <button
        type="button"
        className={filter === "pending" ? "active" : ""}
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </button>
    </div>
  );
};

export default TaskFilter;
