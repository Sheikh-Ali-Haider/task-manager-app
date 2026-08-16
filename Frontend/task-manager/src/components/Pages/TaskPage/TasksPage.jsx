import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTasks } from '../../../services/taskService';
import TaskCard from '../../TaskCard/TaskCard';
import './TasksPage.css';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const response = await getAllTasks();
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`, { state: { task } });
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'Completed') return task.isCompleted;
      if (filter === 'Pending') return !task.isCompleted;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Tasks</h1>
        <p className="page-subtitle">{tasks.length} total tasks</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {['All', 'Pending', 'Completed'].map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
            <span className="tab-count">
              {tab === 'All' && tasks.length}
              {tab === 'Completed' && tasks.filter((t) => t.isCompleted).length}
              {tab === 'Pending' && tasks.filter((t) => !t.isCompleted).length}
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found</p>
          <button className="form-button" onClick={() => navigate('/add')}>
            + Add Task
          </button>
        </div>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;