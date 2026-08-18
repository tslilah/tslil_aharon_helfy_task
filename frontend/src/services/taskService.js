const API_URL = "http://localhost:4000/api/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};

export const toggleTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to update task status");
  }

  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
