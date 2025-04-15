import React, { useState} from 'react' 
import { postbookdetails } from '../services/Apicall'
import {useNavigate} from 'react-router-dom';
function Add() {

  const [book,setbook]=useState({'title':'','author':'','pages':'','price':'','language':'','image':null})

  const navigate=useNavigate()  

  async function postbook(event){
    event.preventDefault()
  //  console.log(book)
  let res=await postbookdetails(book)
  console.log(res)

  navigate('/view')  
  }
  
  return (
    <div>
      <div class="container fw-bold bg-secondary p-5 mt-5 text-light  border border-1 shadow" style={{width:"35%"}} >
    <h4 class="text-center">Enter Book Details</h4>
    <form onSubmit={postbook}>
    <div class="mb-3 mt-3">
        <label class="form-label">Book Title</label>
        <input type="text"  onChange={(event)=>{setbook({...book,'title':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Author</label>
        <input type="text"  onChange={(event)=>{setbook({...book,'author':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Language</label>
        <input type="text"  onChange={(event)=>{setbook({...book,'language':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Price</label>
        <input type="number"  onChange={(event)=>{setbook({...book,'price':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Pages</label>
        <input type="number"  onChange={(event)=>{setbook({...book,'pages':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Image</label>
        <input type="file"  onChange={(event)=>{setbook({...book,'image':event.target.files[0]})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label"></label>
        <input type="submit"  class="form-control bg-light text-secondary fs-6 fw-bold border border-3"></input>
    </div>
    </form>

    </div></div>
  )
}

export default Add