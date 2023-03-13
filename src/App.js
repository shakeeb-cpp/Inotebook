import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import Tag from './components/Tag';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type, img) => {
    setAlert({
      msg: message,
      type: type,
      img: img
    })

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }



  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' exact element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About showAlert={showAlert} />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route path='/tag/:id' element={<Tag />} />
          </Routes>
        </div>

      </BrowserRouter>
    </NoteState>
  );
}

export default App;
