import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateTask } from '../../../services/taskService';
import "../../TaskForm/TaskForm.css";

function EditTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const { task } = location.state;

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await updateTask(task.id, { ...task, title, description, priority, isCompleted });
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Edit Task</h1>
        <p className="page-subtitle">Update your task details</p>
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
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;