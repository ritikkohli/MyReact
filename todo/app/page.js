"use client"
import { useState } from "react";

export default function Home() {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [mytodo, setmytodo] = useState([])

  // console.log(title)
  function addTodo(e){
    e.preventDefault();
    let todo = {title,desc};
    let temp = [...mytodo,todo]
    setmytodo(temp);
    console.log(todo);
    console.log(mytodo);
    settitle('');
    setdesc('');
  }

  return (
      <>
        <h1 className="text-4xl bg-cyan-900 text-white flex justify-center py-4">my todo</h1>
          <form className="mx-10 my-10 flex ">
            <input type="text" placeholder="title" value={title} onChange={(e)=>settitle(e.target.value)} className="text-2xl w-1/5 border-2 border-cyan-900	rounded-md px-2 py-1"/>
            <input type="text" placeholder="description" value={desc} onChange={(e)=>setdesc(e.target.value)} className="text-xl w-1/3 border-2 border-cyan-900	rounded-md px-2 py-1 mx-4"/>
            <button className="bg-green-600 text-xl rounded-md py-1 px-2 text-white" onClick={addTodo}>Add</button>            
          </form>
      </>    
  )
}
