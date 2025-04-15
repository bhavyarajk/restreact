import React,{useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {getbookdetail} from '../services/Apicall';

function Detail() {
  const [book,setbook]=useState({})
const {search}=useLocation() //useLocation hook used to get the location/address details.
                             // To get querystring starting with ?
                            //we use const {search}=UseLocation
                          //we get the result as ?id=idvalue


  const queryParams=new URLSearchParams(search)  // it used to change into object format{'id':idvalue}    

const id=queryParams.get('id')       //idvalue

console.log(id)   //displays idvalue


async function fetchbooks(){
  let res=await getbookdetail(id)
  setbook(res.data)
}

useEffect(()=>{fetchbooks()},[]) 




return (
    <div><div class="container mt-3 w-75 bg-secondary text-light p-3">
    <h3>Book Details</h3>
    <table class="table table-bordered text-light">
      <thead>
      
        <tr><th>TITLE</th><td>{book.title}</td></tr>
        <tr><th>AUTHOR</th><td>{book.author}</td></tr>
        <tr><th>PAGES</th><td>{book.pages}</td></tr>
        <tr><th>PRICE</th><td>{book.price}</td></tr>
        <tr><th>LANGUAGE</th><td>{book.language}</td></tr>
        <tr><th>IMAGE</th><td><img src={book.image} height="100px" width="100px"></img></td></tr>
       
      
      </thead>
      </table>
      </div>
      </div>

  )
}

export default Detail