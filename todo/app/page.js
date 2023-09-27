"use client"
import { useState } from "react";
import 'remixicon/fonts/remixicon.css';

export default function Home() {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [mytodo, setmytodo] = useState([])

  function addTodo(e){
    e.preventDefault();
    setmytodo([...mytodo,{title,desc}]);
    settitle('');
    setdesc('');
  }
  function remove(e,id){
    e.preventDefault();
    let temp = [...mytodo];
    temp.splice(id,1);
    setmytodo(temp);
  }

  return (
      <div>
        <h1 className="text-4xl bg-cyan-900 text-white flex justify-center py-4">my todo</h1>
          <div className="flex flex-col bg-lime-400 items-center">

          <form className="my-10 w-72 h-48 flex flex-col justify-between">
            <input type="text" placeholder="title" value={title} maxLength='20' onChange={(e)=>settitle(e.target.value)} 
              className="text-xl border-b-2 outline-0 px-2 py-1 bg-inherit"/>
            <textarea placeholder="description" rows='3' value={desc} maxLength='450' onChange={(e)=>setdesc(e.target.value)}
              className="border-b-2 outline-0 px-2 py-1 resize-none bg-inherit overflow-hidden"/>
            <button className="bg-green-600 text-xl h-10 rounded-md py-1 px-2 text-white" onClick={addTodo}>Add</button>            
          </form>

          <div className="flex gap-6 flex-wrap justify-center">
              {
                mytodo.map(function(t,id){
                  return <div key={id} className="bg-yellow-400 w-72 h-48 rounded-lg p-1 shadow-amber-100">
                    <div className="flex gap-2 pb-1 items-center">
                      <h1 className="bg-white w-6 h-6 flex place-content-center rounded-full p-0">{id+1}</h1>
                      <h1 className="text-xl overflow-hidden h-6 uppercase p-0">{t.title}</h1>
                    </div>
                    <h2 className="p-1 overflow-hidden h-28">{t.desc}</h2>
                    <div className="flex px-4 py-2 justify-between">
                        <button onClick={(e)=>remove(e,id)} className="bg-red-500 px-4 py-1 text-white rounded-lg"><i className="ri-delete-bin-line"/></button>
                        <button className=""><i className="ri-edit-line"/></button>
                    </div>
                  </div>
                })
              }
          </div>
          </div>
      </div>    
  )
}
