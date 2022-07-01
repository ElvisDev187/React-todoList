import React, {useContext} from 'react'
import { AiOutlineDelete} from 'react-icons/ai'
import '../App.css'
import toast, { Toaster } from 'react-hot-toast';
import  TodoContext  from '../context/TodoContext';

const Task = ({task}) => {
  const {removeTask} = useContext(TodoContext);
  return (
    <div className='task'>
        <Toaster/>
      <div className="badge"></div>
      <p>{task.value}</p>
      <div className="box" onClick={()=>{
        removeTask(task)
        toast.success("Tâche supprimée")
        }}>
        <AiOutlineDelete className='ico'/>
      </div>
    </div>
  )
}

export default Task
