"use client"
import { useState, useEffect } from "react";
import 'remixicon/fonts/remixicon.css';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [mytodo, setmytodo] = useState([]);

  useEffect(() => {
    let temp = localStorage.getItem('todo');
    if(temp){
      setmytodo(JSON.parse(temp));
    }
  },[])

 
  // ---------- add todo function ----------
  function addTodo(e){
    e.preventDefault();
    if(title == ''){
      toast.warn('please provide title', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      setmytodo([...mytodo,{title,desc,isCompleted:false}]);
      let temp = [...mytodo,{title:title,desc:desc,isCompleted:false}];
      localStorage.setItem('todo',JSON.stringify(temp));
      settitle('');
      setdesc('');
      toast.info('task added', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  // ---------- remove todo function ----------
  function remove(e,id){
    e.preventDefault();
    let temp = [...mytodo];
    temp.splice(id,1);
    setmytodo(temp);
    localStorage.setItem('todo',JSON.stringify(temp));
    toast.error('task deleted', {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  // --------- complete todo function ----------
  function complete(e,id){
    e.preventDefault();
    if(mytodo[id].isCompleted !== true){
      let temp = [...mytodo];
      temp[id].isCompleted = true;
      setmytodo(temp);
      localStorage.setItem('todo',JSON.stringify(mytodo));
      toast.success('task completed', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
      <div className="font-mono">
        {/* ---------- header ---------- */}
        <div className="flex justify-between items-center bg-gray-500 px-6">
          <h1 className="text-4xl  text-white py-4">todo</h1>
          <a className="text-white bg-[#272829] p-1 rounded" href="https://github.com/ritikkohli">@ritik_kohli</a>
        </div>

        {/* ---------- main container -------- */}
        <div className="flex flex-col items-center">

          {/* ---------- form to add task ---------- */}
          <form className="my-10 w-72 h-48 flex flex-col justify-between ">
            <input type="text" placeholder="title" value={title} maxLength='20' onChange={(e)=>settitle(e.target.value)} 
              className="text-xl text-white border-b-2 border-yellow-400 outline-0 px-2 py-1 bg-inherit"/>
            <textarea placeholder="description" rows='3' value={desc} maxLength='450' onChange={(e)=>setdesc(e.target.value)}
              className="border-b-2 text-white border-yellow-400 outline-0 px-2 py-1 resize-none bg-inherit overflow-hidden"/>
            <button className="bg-yellow-400 hover:scale-95 text-xl h-10 rounded-md py-1 px-2 text-black" onClick={addTodo}>Add</button>
            <ToastContainer position="top-right" autoClose={1500} hideProgressBar newestOnTop={false} closeOnClick rtl={false}
             pauseOnFocusLoss draggable pauseOnHover theme="light"/>            
          </form>

          {/* ---------- todo cards container ---------- */}
          <div className="flex gap-6 flex-wrap justify-center">
              {
                mytodo.map(function(t,id){
                  // ---------- todo card ---------- //
                  return <div key={id}
                    className={`cursor-pointer hover:scale-105 hover:bg-amber-300 w-72 h-48 rounded-lg p-1 ${t.isCompleted ? 'bg-img' : 'bg-yellow-300'}`}>
                    <div className="flex gap-2 pb-1 items-center">
                      <h1 className="bg-white w-6 h-6 flex place-content-center rounded-full p-0">{id+1}</h1>
                      <h1 className="text-xl overflow-hidden h-6 uppercase p-0">{t.title}</h1>
                    </div>
                    <h2 className="p-1 overflow-hidden h-28">{t.desc}</h2>
                    <div className="flex px-4 py-2 justify-between">
                        <button onClick={(e)=>remove(e,id)} className="bg-red-400 hover:bg-red-500  px-4 py-1 text-white rounded-lg"><i className="ri-delete-bin-line"/></button>
                        <button onClick={(e)=>complete(e,id)} className="bg-green-400 hover:bg-green-500  px-4 py-1 text-white rounded-lg"><i className="ri-check-line"/></button>                        
                    </div>
                  </div>
                })
              }
          </div>
          </div>
      </div>    
  )
}