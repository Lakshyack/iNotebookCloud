import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <NavBar/>

   <Routes>
            <Route exap path='/about' element={<About />}/>
            <Route exap path='/home' element={<Home/>}/>

    </Routes>
   </Router>
   </NoteState>
    </>
  );
}

export default App;
