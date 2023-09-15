
// import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Component1/Signup';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

// import Signup from './Component1/Signupjs'

function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
      <Routes>
        <Route exact path= "/" element={<Signup/>}/>
        <Route exact path= "/signup" element={<Signup/>}/>
      </Routes>

    
    </div>
    </BrowserRouter>
  );
}

export default App;
