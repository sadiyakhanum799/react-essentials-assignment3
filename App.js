import './App.css';
import {tasksprovider} from './context/TasksContext';
function App(){
  return(
    <tasksprovider>
    <div className="App">
      <h1>tasks manager</h1>
      </div>
      </tasksprovider>
  );
}
export default App;