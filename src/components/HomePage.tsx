"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react"; 

type Task = {
  id: string;
  title: string;
  completed: boolean;
}
export default function HomePage() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // fetch all tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/todo');
      if(res.ok){
        const data = await res.json();
        setTasks(data);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async () => {
    const res = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: input }),

    })
    if(res.ok){
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setInput("");
    }
    else{
      console.error("Failed to add task");
    }
  }

  const handleDelete = (id: string, index: number) => async () => {
    const res = await fetch(`/api/todo?id=${id}`,
      {
        method: 'DELETE',
      }
    );
    if(res.ok){
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
    else{
      console.error("Failed to delete task");
    }
  
  }

  return (
    <div className="min-h-screen">
        <div className="flex gap-5 items-center justify-center mt-10">
      <Input 
      placeholder="Enter your task"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="mb-3 w-1/2"
      />

      <Button 
      onClick={addTask}
        className="mb-3 bg-pink-50"
        >Add Task</Button>
    </div>
    <div className="mt-10 flex flex-col items-center">
        {/*  show task here */}
        <h3>all your todo's</h3>
        <ul className="mt-20 w-1/2  rounded-md space-y-2">
            {tasks.map((task, index) => {
                return (
                  <li
                  key={index}
                  className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 flex justify-between items-center"
                >
                  {task.title}
                  <Button onClick={handleDelete(task.id, index)}>
                  <Trash2 />
                  </Button>
                  
                </li>
                
                )
                
            })}

        </ul>
    </div>
    </div>
  );
}
