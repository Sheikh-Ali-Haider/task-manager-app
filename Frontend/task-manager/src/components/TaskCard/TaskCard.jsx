import { deleteTask } from '../../services/taskService';
import './TaskCard.css';

function TaskCard({ task, onDelete, onEdit }) {
  const handleDelete = async () => {
    await deleteTask(task.id);
    onDelete(task.id);
  };

  const getPriorityClass = (priority) => {
    if (priority === 'Low') return 'priority-low';
    if (priority === 'High') return 'priority-high';
    return 'priority-medium';
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h3 className={`card-title ${task.isCompleted ? 'completed' : ''}`}>
          {task.title}
        </h3>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      <p className="card-description">
        {task.description || 'No description provided'}
      </p>

      <div className="card-footer">
        <span className={`status-badge ${task.isCompleted ? 'done' : ''}`}>
          {task.isCompleted ? '✅ Completed' : '⏳ Pending'}
        </span>
        <div className="card-actions">
          <button className="btn-edit" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;