import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Detail from './components/Detail';
import Update from './components/Update';
import Register from './components/Register';
import Login from './components/Login';
import Search from './components/Search';
import Addreview from './components/Addreview';
import Add from './components/Add';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [islogin,settoken]=useState(false)  //1

  function checkloginstatus()  //2
  {
    let token=localStorage.getItem('token') //if token presnt updates islogin value to true else false
  settoken(!(!token))  }


  useEffect(()=>{checkloginstatus()},[]) //3 //when recipe app first loaded it calls checkloginstatus()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar islogin={islogin} onlogout={checkloginstatus}/>
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
        <Route path="/update" element={<Update/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/login" element={<Login onlogin={checkloginstatus}/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/addreview" element={<Addreview islogin={islogin}/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        
        
        
        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
