import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineAdd } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";
import { TiEdit } from "react-icons/ti";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("todos");
    if(data){
      let loadFile = JSON.parse(localStorage.getItem("todos"))
      settodos(loadFile)
    }
  }, [])

  const saveFile = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  } 

  const addTask = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveFile()
  };

  const delTask = (e) => {
    let id = e.currentTarget.getAttribute("name");
    let newTodos = todos.filter(item => {
      return item.id !== id;
    }
    );
    settodos(newTodos);
    saveFile()
   };

  const editTask = (e) => { 
    let id = e.currentTarget.getAttribute("name")
    let t = todos.filter(i => i.id ===id)
    settodo(t[0].todo )
    let newTodos = todos.filter(item => {
      return item.id !== id;
    }
    );
    settodos(newTodos);
    saveFile()
  };

  const handleChange = (e) => {
    settodo(e.target.value);
    saveFile()
  };

  const handleComplete = (e) => {
    let id = e.currentTarget.getAttribute("name");
    let index = todos.findIndex((items) => items.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveFile()
  };

  return (
    <>
      <nav className="bg-slate-700">
        <div className="logo py-4 px-3">
          <h1 className="text-red-500 mx-4 underline font-bold text-4xl">
            Work Recorder
          </h1>
        </div>
      </nav>
      <div className="bg-purple-500 h-[92vh] py-7">
        <div className="container border-[3px] bg-blue-400 border-red-700 m-auto py-4 w-[650px] min-h-[650px] rounded-2xl">
          <div className="mx-5">
            <h2 className="font-bold text-3xl">ToDo List :-</h2>
          </div>
          <div>
            <div className="mx-5 flex space-x-5 mt-3">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                className="bg-black opacity-40 rounded-2xl w-[80%] text-white p-2 px-3 border-white"
              />
              <button className=" cursor-pointer " disabled={todo.length<4} onClick={addTask}>
                <MdOutlineAdd />
              </button>
            </div>
          </div>
          <div className="px-5 mt-4">
            <h3 className="font-bold text-2xl">Your Tasks:-</h3>
            {todos.length === 0 && <div><h5 className="m-3 font-medium">No tasks right now</h5></div> }
            {todos.map(items => {
              return (
                <div key={items.id} className="flex justify-between ">
                  <div>
                    <div className="task font-semibold text-lg">
                      <p className={items.isCompleted?"line-through":""}>
                        {items.todo}
                      </p>
                    </div>
                  </div>
                  <div className="task-buttons space-x-1">
                    <button
                      name={items.id}
                      value={items.isCompleted}
                      onClick={handleComplete}
                    >
                      <TiTick />
                    </button>
                    <button 
                    name={items.id}
                    onClick={editTask} >
                      <TiEdit />
                    </button>
                    <button name={items.id} onClick={delTask} >
                      <TiDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
