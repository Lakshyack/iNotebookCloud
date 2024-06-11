import Delete from './SVG/DeleteIcon'
import Edit from './SVG/Edit';
import React ,{useContext,useState}from 'react'
import noteContext from '../context/Notes/noteContext';


export default function NoteItems(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note} = props;
  return (
    <div className='col-md-3'>
     <div className="card my-3" style={{ width: "18rem" }}>

  <div className="card-body">
 <div className="d-flex align-items-start">
 <h5 className="card-title">{note.title}</h5>
    <i  className='icon mx-2' onClick={()=>{deleteNote(note._id)}} ><Delete/></i>
     <i  className='icon mx-2'><Edit/></i>
 </div>
    <p className="card-text">{note.description}</p>
    
  </div>
</div>

    </div>
  )
}
