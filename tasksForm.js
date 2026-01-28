import {useState} from 'react';
import { useTasksContext } from '../context/TasksContext';
function TasksForm(){
      const {addTask}= useTasksContext();
      const [formData,setFormData]= useState({
            title:'',
            description:'',
            priority:'medium',
      });
      const handleSubmit=(e)=>{
            e.preventDefault();
            if (!formData.title.trim()) return;
            addTask(formData);
            setFormData({
                  title:'',
                  description:'',
                  priority:'medium',
            });
      };
      const handleChange=(e)=>{
            const {name,value}= e.target;
            setFormData((prevData)=>({
                  ...prevData,
                  [name]:value,
            }));
      }