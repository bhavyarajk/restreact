import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchbook } from '../services/Apicall'
import { useEffect } from 'react'
function Search() {
  
  const {search}=useLocation() //useLocation hook used to get the location/address details.
                             // To get querystring starting with ?
                            //we use const {search}=UseLocation
                          //we get the result as ?word=keyword

   const [books,setbook]=useState([])
  const queryParams=new URLSearchParams(search)  // it used to change into object format{'word':keyword}    

const w=queryParams.get('word')       //keyword

console.log(w)

async function searchbooks(){
  let res=await searchbook(w)
  // console.log(res)
  setbook(res.data)

}


useEffect(()=>{searchbooks()},[w])


  return (
    <div><div class="container mt-1 w-75 bg-secondary text-light p-3">
      {Array.isArray(books)?
      <div>
      <h2>Book List</h2>
     <table class="table table-bordered text-light">
        <thead>
        <tr>
          <th>IMAGE</th>
          <th>TITLE</th>
          <th>AUTHOR</th>
          <th>PAGES</th>
          <th>PRICE</th>
          <th>LANGUAGE</th>
         
        </tr></thead>
        <tbody>
  
          {books.map((i)=><tr>
            <td>{i.image}</td>
            <td>{i.title}</td>
            <td>{i.author}</td>
            <td>{i.pages}</td>
            <td>{i.price}</td>
            <td>{i.language}</td>
            
            </tr>)}
          
          
        </tbody>
      </table></div>:<h4>No Results Found</h4>}
    
    </div></div>
  )
}

export default Search