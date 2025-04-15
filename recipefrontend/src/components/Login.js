import React from 'react'
import { useState } from 'react'
import { userlogin } from '../services/Apicall'
import { useNavigate } from 'react-router-dom'
function Login({onlogin}) {
  const navigate=useNavigate()
  async function login(event)
  {
event.preventDefault()
// console.log(user)
let res=await userlogin(user)
let d=res.data['token']
localStorage.setItem('token','token '+d)
console.log(localStorage.getItem('token'))
onlogin() //calls checkloginstatus() and updates is login value to true\
navigate('/')
  }
  const [user,setuser]=useState({username:'',password:''})
  return (
    <div><div class="container w-50 fw-bold fs-5 text-light border border-1 border-danger shadow p-5">

    <h2 class="text-center text-light mt-2">Login</h2>
<form onSubmit={login}>
   <div class="mb-3">
    <label class="form-label">Username</label>
    <input type="text" class="form-control" onChange={(event)=>{setuser({...user,username:event.target.value})}} placeholder="Enter Username"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" onChange={(event)=>{setuser({...user,password:event.target.value})}} placeholder="Enter Password"></input>
   </div>
   <div class="mb-3">
    
    <input type="submit" class="form-control" ></input>
   </div>
   </form>
   </div></div>
  )
}

export default Login