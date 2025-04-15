import React, { useState } from 'react'
import { userregister } from '../services/Apicall'
import { useNavigate } from 'react-router-dom'

function Register() {

const [user,setuser]=useState({username:'',password:'',email:'',first_name:'',last_name:''})
const navigate=useNavigate()
  async function register(event){
    event.preventDefault()
    console.log(user)
    let res=await userregister(user)
    console.log(res)
    navigate('/login')
  }
  return (
    <div>
      <div class="container w-50 fw-bold fs-5 text-light border border-1 border-danger shadow p-5">

    <h2 class="text-center text-light mt-2">Add User Details</h2>
<form onSubmit={register}>
   <div class="mb-3">
    <label class="form-label">Username</label>
    <input type="text" class="form-control"  onChange={(event)=>{setuser({...user,username:event.target.value})}} placeholder="Enter Username"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Password</label>
    <input type="password" class="form-control" onChange={(event)=>{setuser({...user,password:event.target.value})}} placeholder="Enter Password"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Firstname</label>
    <input type="text" class="form-control" onChange={(event)=>{setuser({...user,first_name:event.target.value})}} placeholder="Enter Firstname"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Lastname</label>
    <input type="text" class="form-control" onChange={(event)=>{setuser({...user,last_name:event.target.value})}} placeholder="Enter Lastname"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Email</label>
    <input type="text" class="form-control"  onChange={(event)=>{setuser({...user,email:event.target.value})}} placeholder="Enter Email"></input>
   </div>
   <div class="mb-3">
    
    <input type="submit" class="form-control"></input>
   </div>
  
   </form>
   </div> </div>
  )
}

export default Register