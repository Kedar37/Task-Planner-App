import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {

  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("tasks")
    if(todoString) {
      let tasks = JSON.parse(localStorage.getItem("tasks"))
      setTasks(tasks)
    }
  }, [])
  
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const saveToLocal = (params) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  const handleCreate = () => {
    setTasks([...tasks, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLocal()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = tasks.findIndex(item=>{
        return item.id === id;
    })
    let newTodos = [...tasks];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTasks(newTodos);
    saveToLocal()
  }

  const handleEdit = (e, id) => {
    let t = tasks.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = tasks.filter(item=>{
      return item.id !== id;
    });
    setTasks(newTodos);
    saveToLocal()
  }

  const handleDelete = (e, id) => {
    let index = tasks.findIndex(item=>{
        return item.id === id;
    })
    let newTodos = tasks.filter(item=>{
      return item.id !== id;
  })
    setTasks(newTodos);
    saveToLocal()
  }

  return (
    <>
    <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        
        <div className='text-center'>
          <h2 className='text-xl font-bold'>Create Task</h2>
          <input className='p-3 py-2 w-1/2 mt-3 rounded-l-md rounded-bl-md' type="text" onChange={handleChange} value={todo}/>
          <button 
            onClick={handleCreate}
            disabled={todo.length<=3} 
            className='bg-blue-600 hover:bg-blue-700 disabled:opacity-25 p-3 py-2 text-white rounded-r-md rounded-br-md'>
          Create
          </button>
        </div>

        <div className='h-0.5 bg-slate-500 w-full mt-10'></div>
        
        <div className='flex justify-between items-center mt-7'>
          <h2 className='text-xl font-bold'>Your Task Planner</h2>
          <div>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished Tasks
          </div>
        </div>

        <div className='mt-6'>

          {tasks.length === 0 && <div className='mt-3'>No tasks right now!</div>}

          {tasks.map(item => {           
            return (showFinished || !item.isCompleted) && 
            <div key={item.id} className="to-do flex justify-between my-3 items-center">
              <div className='flex gap-3'>
                <input onChange={handleCheck} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="btn flex h-full">
                <button onClick={(e) =>handleEdit(e, item.id)} className='bg-blue-600 hover:bg-blue-700 p-3 py-2 text-white ml-3 rounded-md'>Edit</button>
                <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-blue-600 hover:bg-blue-700 p-3 py-2 text-white ml-3 rounded-md'>Delete</button>
              </div>
            </div>
          })}
        </div>
        
      </div>
    </>
  )
}

export default App