import React,{useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {editbookdetails, getbookdetail} from '../services/Apicall';

function Edit() {
  const [book,setbook]=useState({'title':'','author':'','pages':'','price':'','language':'','image':null})

  //fetch id from url
  const {search}=useLocation() //useLocation hook used to get the location/address details.
                             // To get querystring starting with ?
                            //we use const {search}=UseLocation
                          //we get the result as ?id=idvalue


  const queryParams=new URLSearchParams(search)  // it used to change into object format{'id':idvalue}    
const navigate=useNavigate()
const id=queryParams.get('id')   

  //declare a function to fetch details of a book
  async function fetchbooks(){
    let res=await getbookdetail(id)
    setbook(res.data)
  }
async function editbook(event){
  event.preventDefault()
  console.log(book)

const ubook={...book}

if (typeof ubook.image == 'string')  //if we dont want to edit image field 
{

  delete ubook.image
  
}

console.log(ubook)
let res=await editbookdetails(ubook,id)
console.log(res)
navigate('/view')
}
  //declare useEffect hook

useEffect(()=>{fetchbooks()},[]) 


 
  return (
    <div><div class="container fw-bold bg-secondary p-5 mt-5 text-light  border border-1 shadow" style={{width:"35%"}} >
    <h4 class="text-center">Edit Book Details</h4>
    <form onSubmit={editbook}>
    <div class="mb-3 mt-3">
        <label class="form-label">Book Title</label>
        <input type="text" value={book.title}  onChange={(event)=>{setbook({...book,'title':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Author</label>
        <input type="text" value={book.author}  onChange={(event)=>{setbook({...book,'author':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Language</label>
        <input type="text"  value={book.language} onChange={(event)=>{setbook({...book,'language':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Price</label>
        <input type="number" value={book.price}  onChange={(event)=>{setbook({...book,'price':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Pages</label>
        <input type="number" value={book.pages} onChange={(event)=>{setbook({...book,'pages':event.target.value})}} class="form-control"></input>
    </div>
    <div class="mb-3 mt-3">
        <label class="form-label">Image</label>
        <img src={book.image} height="100px" width="100px"></img>
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

export default Edit