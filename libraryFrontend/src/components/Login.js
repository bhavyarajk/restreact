import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userlogin } from '../services/Apicall'

function Login({onlogin}) {
  const [user,setuser]=useState({'username':'','password':''})

  const navigate=useNavigate()
  async function login(event){
   
    event.preventDefault()
    console.log(user)

    let res=await userlogin(user)

    console.log(res.data)

    let d=res.data['token']  //retrieve the token number from response data

    console.log(d)

    localStorage.setItem('token','token '+d) //adds the data into localStorage as token:token "tokennumber"
    onlogin()
    console.log(localStorage.getItem('token')) //retrieves the data from locastorage 







    navigate('/')
  }
  return (
    <div>
       <div class="container fw-bold bg-secondary p-5 mt-5 text-light  border border-1 shadow" style={{width:"35%"}} >
    <h4 class="text-center">Enter User Details</h4>
    <form  onSubmit={login}>
    <div class="mb-3 mt-3">
        <label class="form-label">Username</label>
        <input type="text" onChange={(event)=>{setuser({...user,'username':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Password</label>
        <input type="password" onChange={(event)=>{setuser({...user,'password':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label"></label>
        <input type="submit" class="form-control"></input>
    </div>
    </form>
    </div>
    </div>
  )
}

export default Login