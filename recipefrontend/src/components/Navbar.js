import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userlogout } from '../services/Apicall'
function Navbar({islogin,onlogout}) {
  const navigate=useNavigate()
  const [w,setw]=useState('')
  async function logout(){
    let res=await userlogout()
    console.log(res)
    localStorage.removeItem('token') //removes the token
    onlogout()//calls checkloginstatus() updates islogin to false
}


   function input(event){
    setw(event.target.value)
   }


  function search(){
    console.log(w)
    navigate(`/search?word=${w}`)
  }

  return (
    <div>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand fs-3 fst-italic" href="#">Food Recipe Management</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-5">
        <li class="nav-item">
            <Link to="/">
          <a class="nav-link" aria-current="page" href="#">Home</a></Link>
        </li>
        {!islogin &&(
          <>
        <li class="nav-item">
            <Link to="/register">
          <a class="nav-link" href="#">Register</a></Link>
        </li>
        <li class="nav-item">
        <Link to="/login">
          <a class="nav-link" href="#">Login</a></Link>
        </li>
        </>
        )}

        {islogin &&(
          <>
          <li class="nav-item">

<a class="nav-link" onClick={logout}>Logout</a>
</li>
          </>
        )}
        
        
      
      </ul>
      
        <input class="form-control me-2 border border-1 border-dark" onChange={input} type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-dark" onClick={search}>Search</button>
    
    </div>
  </div>
</nav>


    </div>
  )
}

export default Navbar