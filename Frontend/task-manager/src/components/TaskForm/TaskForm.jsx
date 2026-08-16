import { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../services/taskService';
import './TaskForm.css';

function TaskForm({ onSave, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setIsCompleted(editingTask.isCompleted);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setIsCompleted(false);
    }
  }, [editingTask]);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    const task = { title, description, priority, isCompleted };

    if (editingTask) {
      await updateTask(editingTask.id, { ...task, id: editingTask.id });
    } else {
      await createTask(task);
    }

    onSave();
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{editingTask ? '✏️ Edit Task' : '+ New Task'}</h2>
      <div className="form-grid">
        <input
          className="form-input"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          Mark as Completed
        </label>
      </div>
      <button className="form-button" onClick={handleSubmit}>
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  );
}

export default TaskForm;