import  {useTaskContext} from '../context/TasksContext';
import TasksItem from './tasksItem';
function TasksList(){
      const {tasks,taskState}= useTaskContext();
      if (tasks.length===0){
            return(
                  <div className="empty-search">
                        <p>No tasks available. Please add a task.</p>
                  </div>
            );
      }
      return {
      <div className ="TasksList">
            <div className="tasksStat">
            <span> Total: {taskState.total}</span>
            <span> Completed: {taskState.completed}</span>
            <span> Pending: {taskState.pending}</span>
            </div>
        <div className="TasksItems">
            {tasks.map(task=>(
                  <TasksItem key={task.id} task={task}/>
            ))}
       </div>

      </div>
      };
