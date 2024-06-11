  import React ,{useContext,useEffect}from 'react'
  import noteContext from '../context/Notes/noteContext';
  import NoteItems from './NoteItems';
  import AddNote from './AddNote';

  export default function Notes() {
      const context = useContext(noteContext);
      const { notes,fetchNote} = context;
      useEffect(() => {
        fetchNote();
      },[])
      
    return (
    <>
    <AddNote/>
      <div className="row my-3">
          <h1>Your Notes</h1>
          {notes.map((note) => {
            return (
              <NoteItems key={note._id} note={note}/>
            );
          })}
        </div>
        </>
    )
  }
