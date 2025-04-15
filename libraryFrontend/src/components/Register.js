import React, { useState } from 'react'
import { createuser } from '../services/Apicall'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [user,setuser]=useState({'username':'','password':'','email':'','first_name':'','last_name':''})

  const navigate=useNavigate()
  async function register(event){
   
    event.preventDefault()
    console.log(user)

    let res=await createuser(user)
    console.log(res)
    navigate('/')
  }
  return (
    <div>
      <div class="container fw-bold bg-secondary p-5 mt-5 text-light  border border-1 shadow" style={{width:"35%"}} >
    <h4 class="text-center">Enter User Details</h4>
    <form  onSubmit={register}>
    <div class="mb-3 mt-3">
        <label class="form-label">Username</label>
        <input type="text" onChange={(event)=>{setuser({...user,'username':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Password</label>
        <input type="password" onChange={(event)=>{setuser({...user,'password':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Email</label>
        <input type="text" onChange={(event)=>{setuser({...user,'email':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">First_name</label>
        <input type="text" onChange={(event)=>{setuser({...user,'first_name':event.target.value})}}class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Last_name</label>
        <input type="text" onChange={(event)=>{setuser({...user,'last_name':event.target.value})}}class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label"></label>
        <input type="submit" class="form-control"></input>
    </div>
    </form>
    </div></div>
  )
}

export default Register