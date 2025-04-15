import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import View from './components/View';
import Add from './components/Add';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Detail from './components/Detail';
import Edit from './components/Edit';
import Search from './components/Search';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [islogin,settoken]=useState(false) //default is set to false

  function checkloginstatus(){
    let token=localStorage.getItem('token') //checks whether the token in localstorage
    settoken(!(!token)) //if yes it updates islogin to true else false
}


useEffect(()=>checkloginstatus(),[])  //when app component is first loaded
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar islogin={islogin} onlogout={checkloginstatus}/>
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/view" element={<View/>}></Route>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login onlogin={checkloginstatus}/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
        <Route path="/edit" element={<Edit/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        

      </Routes>
      </BrowserRouter>




    </div>
  );
}

export default App;
