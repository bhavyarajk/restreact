import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addreviewdetail } from '../services/Apicall';
function Addreview({islogin}) {
  const {search}=useLocation() //useLocation hook used to get the location/address details.
  // To get querystring starting with ?
 //we use const {search}=UseLocation
//we get the result as ?id=idvalue


const queryParams=new URLSearchParams(search)  // it used to change into object format{'id':idvalue}    

const id=queryParams.get('id')
console.log(id)
console.log(islogin)
  const [review,setreview]=useState({'id':'','rating':'','comment':''})
  async function addreview(event){
    event.preventDefault()
    console.log(id)
    console.log("after submit",review)
   const review1={...review,id:id}
   console.log("after adding id",review1)
   let res=await addreviewdetail(review1)
   console.log(res)
  
  
  }
  return (
    <div>
      {islogin?
      <div class="container w-50 fw-bold fs-5 text-light border border-1 border-danger shadow p-5">
       
       <form onSubmit={addreview}>
           <div class="mb-3">
            <label class="form-label">Comment</label>
            <textarea class="form-control" onChange={(event)=>{setreview({...review,comment:event.target.value})}}>Enter your comment here.....</textarea>
           </div>
          
           <div class="mb-3">
            <label class="form-label">Rating</label>
            <input type="number" class="form-control" onChange={(event)=>{setreview({...review,rating:event.target.value})}} placeholder="Enter rating" max="5" min="1"></input>
           </div>
           <div class="mb-3">
            <label class="form-label"></label>
            <input type="submit" class="form-control"></input>
           </div>
        </form>
    </div>:<div class="container w-50 fw-bold fs-5 text-light border border-1 border-danger shadow p-5">Need to Login </div>
}
    </div>
  )
}

export default Addreview