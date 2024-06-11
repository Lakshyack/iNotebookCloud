import React, { useState } from "react";
import noteContext from "./noteContext";



const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitialize = []
  const [notes, setNotes] = useState(notesInitialize);

//Fetch all note
const fetchNote =async ()=>{
  // TODO : API Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
      'auth-token'  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1ZDYxMzM2YWM1NGU4OTVmODE5YTJiIn0sImlhdCI6MTcxNzQyNDEyNH0.v0oI-QY5fxJJAZQv3_YSvTY4S6_Ne6PYe3CrxtYflrw"
    },
    // body: JSON.stringify({title,description,tag}) 
  });
  const json = await response.json(); 
  // console.log(json)
  setNotes(json)
}


  //Add a note
  const addNote =async (title, description, tag)=>{
    console.log("adding a new note")

    // TODO : API Call
    const response = await fetch(`$(host)/api/notes/addnote`, {
      method: 'get', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token"  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1ZDYxMzM2YWM1NGU4OTVmODE5YTJiIn0sImlhdCI6MTcxNzQyNDEyNH0.v0oI-QY5fxJJAZQv3_YSvTY4S6_Ne6PYe3CrxtYflrw"
      },
      body: JSON.stringify({title,description,tag
    }) 
    })
    const json =  response.json(); 

   const note = {
    "_id": "665dda0911542927de63cjnn03edcwsa78",
    "user": "665d61336ac54e895f819a2b",
    "title": title,
    "description": description,
    "tag": "personal",
    "date": "2024-06-03T14:58:17.024Z",
    "__v": 0
  };
    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id)=>{

    // TODO : API Call
    const response = await fetch(`${host}/api/notes/updateanote/`, {
      method: 'put', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token"  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      },
      body: JSON.stringify({ }) 
    })
    const json =  response.json(); 

   console.log("deleting a note" + id)
   const newNote = notes.filter((note) => {return note._id !== id});

   setNotes(newNote);
  }

  // Edit a note
  const editNote = async (id,title,description,tag)=>{ 

    // API Call   
       // TODO : API Call
       const response = await fetch(`${host}/api/notes/updateanote/${id}`, {
        method: 'put', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token"  : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        },
        body: JSON.stringify({"title" : "My Title udated",
        "description" : "description update",
        "tag" : "persnol"
      }) 
      })
      const json =  response.json(); 
   for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(notes._id === id){
      element.title = title;
      element.description = description;
      element.tag = tag;
    }
    
   }

  }


  return (
    <noteContext.Provider value={{ notes, addNote,deleteNote,editNote,fetchNote }}>

      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
