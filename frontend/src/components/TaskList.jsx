import { useEffect, useRef } from "react";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
  const trackRef = useRef(null);
  const firstSetRef = useRef(null);

  useEffect(() => {
    if (tasks.length <= 1) {
      return;
    }

    const track = trackRef.current;
    const firstSet = firstSetRef.current;

    if (!track || !firstSet) {
      return;
    }

    let animationFrameId;
    let position = 0;

    const speed = 0.5;

    const animate = () => {
      position += speed;

      const setWidth = firstSet.offsetWidth;

      if (position >= setWidth) {
        position = 0;
      }

      track.style.transform = `translateX(-${position}px)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="empty-tasks">
        <p>No tasks yet.</p>
      </div>
    );
  }

  if (tasks.length === 1) {
    return (
      <div className="single-task">
        <TaskItem
          task={tasks[0]}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="carousel">
        <div className="carousel-track" ref={trackRef}>
          <div className="carousel-set" ref={firstSetRef}>
            {tasks.map((task) => (
              <div className="carousel-slide" key={`first-${task.id}`}>
                <TaskItem
                  task={task}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>

          <div className="carousel-set" aria-hidden="true">
            {tasks.map((task) => (
              <div className="carousel-slide" key={`clone-${task.id}`}>
                <TaskItem
                  task={task}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
