import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../../services/taskService';
import "../../TaskForm/TaskForm.css";

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    const task = { title, description, priority, isCompleted };
    await createTask(task);
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Add New Task</h1>
        <p className="page-subtitle">Fill in the details to create a new task</p>
      </div>

      <div className="form-container">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input
              className="form-input"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              className="form-input"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            Mark as Completed
          </label>
        </div>
        <div className="form-actions">
          <button className="btn-cancel" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button className="form-button" onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTask;