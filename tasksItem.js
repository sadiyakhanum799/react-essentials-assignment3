import tasksActions from './tasksActions';

function TasksItem({ task, deleteTask, editTask }) {
      return (
            <div className="task-item">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <tasksActions
                  taskId={task.id}
                  deleteTask={deleteTask}
                  editTask={editTask}
                  />
            </div>
      )
}
export default TasksItem;