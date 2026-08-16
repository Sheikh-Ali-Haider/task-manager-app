import axios from 'axios';

const API_URL = 'http://localhost:5151/api/tasks';

// GET all tasks
export const getAllTasks = () => axios.get(API_URL);

// POST new task
export const createTask = (task) => axios.post(API_URL, task);

// PUT update task
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);

// DELETE task
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);