import React, { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = () => {


  return (
    <div>
 
      <Notes/>
    </div>
  );
}

export default Home;
