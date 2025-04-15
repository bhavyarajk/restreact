import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchrecipedetail } from '../services/Apicall';

function Search() {
  const {search}=useLocation() //useLocation hook used to get the location/address details.
  // To get querystring starting with ?
 //we use const {search}=UseLocation
//we get the result as ?id=idvalue

const [recipe,setrecipe]=useState([])
const queryParams=new URLSearchParams(search)  // it used to change into object format{'id':idvalue}    

const w=queryParams.get('word')
console.log(w)


async function searchrecipe(){
  let res=await searchrecipedetail(w)
  console.log(res)
  setrecipe(res.data)
}

useEffect(()=>{searchrecipe()},[])


  return (
    <div><div class="container border border-1 border-danger shadow pt-3">

    <h2 class="text-center text-light mt-2 mb-4 fw-bold">Search Results</h2>
    {Array.isArray(recipe)?<div class="row">
     
     {recipe.map((s)=><div class="col-4">
       <div class="card mx-auto mt-3 p-3 border boder-2 border-dark rounded" style={{width: "20rem"}}>
 <img src={s.image} class="card-img-top" style={{width:"100%",height:"250px"}}></img>
 <div class="card-body text-center">
   <h5 class="card-title">{s.recipe_name}</h5>
   </div>
 </div></div>)}
 
 </div>:<h2>No Results Found</h2>}
    
</div>

</div>

  )

}
export default Search