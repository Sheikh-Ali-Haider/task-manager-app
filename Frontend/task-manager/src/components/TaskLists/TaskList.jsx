import TaskCard from '../TaskCard/TaskCard';

function TaskList({ tasks, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <p>No tasks yet add one above!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;