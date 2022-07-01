/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import {useContext, useEffect, useState} from 'react'
import TodoContext from './context/TodoContext'
import {AiOutlineSearch, AiOutlinePlus} from 'react-icons/ai'
import Task from './components/Task';

function App() {

    const {tasks, addTask, setTasks} = useContext(TodoContext);
    const [filteredList, setFilteredList] = useState([]);
    const [querry, setQuerry] = useState('');
    const [newTaskValue, setNewTaskValue] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const Filter = (querry) =>{
        const filtered = tasks.filter((item)=> item.value.toLowerCase().includes(querry.toLowerCase()));
        setFilteredList(()=>[...filtered]);
    }

    const notify = () => toast.success('Nouvelle tâche ajoutée !');

    const getInitialList = () =>{
      const data = localStorage.getItem('tasks');
      const res = JSON.parse(data) == null ? [] : JSON.parse(data) ;
      setTasks(()=>res);
    }

    useEffect(()=>{
       getInitialList();
       Filter(querry)
      console.log(filteredList);
    }, [tasks, querry])

    
    const handle = (e)=>{
      setQuerry(e.target.value);
    }

    const handleNewValue = (e)=>{
      setNewTaskValue(e.target.value);
    }

    const pluriel = () =>{
      const res = filteredList.length > 1? "s" :  "";
      return res
    }


 
  return (
  
    <div className="container">
      <div className="header-container">
        <h1>To-Do List</h1>
       <div className="search">
        <input type="text" value={querry} placeholder="Search Task..." onChange={(e)=>handle(e)}/>
          <AiOutlineSearch className='ico'/>
          
       </div>
      </div>
      <div className="middle-container">
        <div className="add-task-container">
          <h4>New Task</h4>
          <div className="search">
          <input type="text" value={newTaskValue} onChange={(e)=>handleNewValue(e)} />
          </div>
          <small>Less than 30 caracter</small>
          <button className='btn' onClick={()=>{
            if(newTaskValue.length <= 30){
              addTask({id: Math.floor(Date.now() * Math.random()), value : newTaskValue})
              setNewTaskValue("")
              notify();
            }else{
              toast.error("Limit caracter is 30")
            }
            }}>
            <AiOutlinePlus className='ico'/>
          </button>
          <Toaster />
        </div>
        <center><h3>Vous avez {filteredList.length} tache{pluriel()} {filteredList.length === tasks.length? '' : `corespondante${pluriel()} à "${querry}"`}</h3></center> 
        <div className="task-wrapper">
         { filteredList.length > 0 ? filteredList.map((item, i)=>(
           <Task key={i} task={item}/>
           )):
           <center><h2>Oups vous n'avez pas de taches</h2></center>
          }
        </div>
      </div>
      <div className="footer-container">
        <p>Copyrigth  2022 ElvisDev-All right reserved</p>
      </div>
    </div>
  );
}

export default App;
