
import { useState, createContext} from 'react'

const TodoContext  = createContext();

export function TodoContextProvider(props){

    const [tasks, setTasks] = useState([]);
    const addTask = (task) =>{
        const newtasks = [...tasks, task];
        setTasks(newtasks);
        localStorage.setItem('tasks', JSON.stringify(newtasks));
    }
    const removeTask = (task) =>{
        const newtasks = tasks.filter((item)=> item.id !== task.id);
        setTasks(newtasks);
        localStorage.setItem('tasks', JSON.stringify(newtasks));
    }

    const value = {
        tasks,
        addTask,
        removeTask,
        setTasks
    }

    return(
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    )
}


export default TodoContext;