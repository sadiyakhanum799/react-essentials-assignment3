import { type } from '@testing-library/user-event/dist/type';
import { createContext, useContext, useReducer } from 'react';
const initialState = {
      tasks: [{
            id: 1,
            title: 'Learn React Context',
            description: 'Understand how context API works',
            completed: false,
            priority: 'High',
            createdAt: new Date().toISOString(),
      },
      { 
            id: 2,
            title: 'Build a Task Manager',
            description: 'Create a task manager app using React',
            completed: false,
            priority: 'Medium',
            createdAt: new Date().toISOString(),
      }
],
      filter: 'ALL', 
      searchTerm: '',
      isLoading: false,
      history: [],
};
export const ACTIONS = {
      ADDTASK: 'add-task',
      DELETETASK: 'delete-task',
      EDITTASK: 'edit-task',
      TOGGLECOMPLETE: 'toggle-complete',
      SETFILTER: 'set-filter',
      SETSEARCH: 'set-search',
      SETLOADING: 'set-loading',
      UNDO: 'undo',
      REDO: 'redo',
};
const tasksReducer = (state, action) => {
      const saveHistory = (newState) => {
            const newHistory = [...state.history, state];
            return { ...newState, history: newHistory };
      };
      switch (action.type) {
            case ACTIONS.ADDTASK:
                  const newTask = {
                        id: Date.now(),
                        title: action.payload.title,
                        description: action.payload.description,
                        completed: false,
                        priority: action.payload.priority,
                        createdAt: new Date().toISOString(),
                  };
      return saveHistory({ ...state, tasks: [...state.tasks, newTask] });
      case ACTIONS.DELETETASK:
            const filteredTasks = state.tasks.filter(task => task.id !== action.payload.id);
            return saveHistory({ ...state, tasks: filteredTasks });
      case ACTIONS.EDITTASK:
            const updatedTasks = state.tasks.map(task =>
                  task.id === action.payload.id
                        ? { ...task, ...action.payload.updates }
                        : task
            );
            return saveHistory({ ...state, tasks: updatedTasks });
      case ACTIONS.TOGGLECOMPLETE:
            const toggledTasks = state.tasks.map(task =>
                  task.id === action.payload.id
                        ? { ...task, completed: !task.completed }
                        : task
            );
            return saveHistory({ ...state, tasks: toggledTasks });
      case ACTIONS.SETFILTER:
            return { ...state, filter: action.payload.filter };
      case ACTIONS.SETSEARCH:
            return { ...state, searchTerm: action.payload.searchTerm };
      case ACTIONS.SETLOADING:
            return { ...state, isLoading: action.payload.isLoading };
      case ACTIONS.UNDO:
            if (state.history.length === 0) return state;
            const previousState = state.history[state.history.length - 1];
            const newHistory = state.history.slice(0, -1);
            return { ...previousState, history: newHistory };
      default:
            return state;
            case ACTIONS.EDITTASK:
                  const updatedTasks = state.tasks.map(task =>
                        task.id === action.payload.id
                              ? { ...task, ...action.payload.updates }
                              : task
                  );
                  return saveHistory({ ...state, tasks: updatedTasks });
                  case ACTIONS.SETSEARCH:
                        return { ...state, searchTerm: action.payload.searchTerm  };
            case ACTIONS.SETLOADING:
                  return { ...state, isLoading: action.payload.isLoading  };
            case ACTIONS.UNDO:
                  if (state.history.length === 0) return state;
                  const previousState = state.history[state.history.length - 1];
                  const newHistory = state.history.slice(0, -1);
                  return { ...previousState, history: newHistory  };
            default:
                  throw new Error(`Unhandled action type: ${action.type}`);
      }
};
const TasksContext = createContext();
export const useTasksContext = () =>{
      const context = useContext(TasksContext);
      if(!context){
            throw new Error('useTasksContext must be used within a TasksProvider');
      }
      return context;
}
export const TasksProvider = ({ childrens }) => {
const [state, dispatch] = useReducer(tasksReducer, initialState);
const addTask = (taskData) => {
      dispatch({
            type: ACTIONS.ADDTASK,
            payload: { taskData },
      });
};
const deleteTask = (taskId) => {
      dispatch({
            type: ACTIONS.DELETETASK,
            payload: { id: taskId },
      });
};
const toggleComplete = (taskId) => {
      dispatch({
            type: ACTIONS.TOGGLECOMPLETE,
            payload: { id: taskId },
      });
};
      const editTask = (taskId, updates) => {
            dispatch({ 
                  type:ACTIONS.EDITTASK,
                  payload:{id:taskId,updates},
            });
      };
      const setFilter = (filter) => {
            dispatch({
                  type: ACTIONS.SETFILTER,
                  payload: { filter },
            });
};
const setSearch = (searchTerm) => {
      dispatch({
            type: ACTIONS.SETSEARCH,
            payload: { searchTerm },
      });
};
const undoAction = () => {
      dispatch({ type: ACTIONS.UNDO });
};

const editTask = (taskId, updates) => {
      dispatch({
            type: ACTIONS.EDITTASK,
            payload: { id: taskId, updates },
      });
};
const toggleComplete = (taskId) => {
      dispatch({
            type: ACTIONS.TOGGLECOMPLETE,
            payload: { id: taskId },
      });
};
const setSearch= (searchTerm) => {
      dispatch({
            type: ACTIONS.SETSEARCH,
            payload: { searchTerm },
      });
};
const setLoading = (isLoading) => {
      dispatch({
            type: ACTIONS.SETLOADING,
            payload: { isLoading },
      });
};
const undo = () => {
      dispatch({ type: ACTIONS.UNDO });
};
const filterTasks = state.tasks.filter((task) => {
      const matchfilter =
      state.filter === 'ALL' ||
      (state.filter === 'COMPLETED' && task.completed) ||
      (state.filter === 'PENDING' && !task.completed);
      const matchesSearch =
       state.searchTearm ===''||
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) || task.description.toLowerCase().includes(state.searchTerm.toLowerCase());
      return matchesSearch && matchfilter;
}
      const tasksStats = {
            total: state.tasks.length,
            completed: state.tasks.filter((task) => task.completed).length,
            pending: state.tasks.filter((task) => !task.completed).length,
      }
     
      const value={
            tasks: filterTasks,
            addTask,
            deleteTask,
            editTask,
            toggleComplete,
            setFilter,
            setSearch,
            setLoading,
            undo,
            isLoading: state.isLoading,
            filter:state.filter,
            searchTerm:state.searchTerm,
            tasksState,

      };
      return(
            <TasksContext.Provider value={value}>
                  {childrens}
            </TasksContext.Provider>
      );
};
export default TasksProvider;