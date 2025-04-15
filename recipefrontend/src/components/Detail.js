import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { allreviews, deleterecipedetail, getrecipdetail } from '../services/Apicall'
import { useEffect } from 'react'
import { useState } from 'react'
function Detail() {
  const [review,setreview]=useState()
  const [recipe,setrecipe]=useState({})
  const navigate=useNavigate()
  const {search}=useLocation() //useLocation hook used to get the location/address details.
                             // To get querystring starting with ?
                            //we use const {search}=UseLocation
                          //we get the result as ?id=idvalue


  const queryParams=new URLSearchParams(search)  // it used to change into object format{'id':idvalue}    

const id=queryParams.get('id')
console.log(id)
async function deleterecipe(i){
  console.log(i)
  let res=await deleterecipedetail(i)
  console.log(res)
  if(res.status>199 && res.status<399)
    navigate('/')
  else{
    alert("cant delete,try again later")
  }
}
function editrecipe(i){
  console.log(i)
  navigate(`/update?id=${i}`)
}

async function fetchrecipedetail(){
  let res=await getrecipdetail(id)
  console.log(res)
  setrecipe(res.data)
}
async function reviews(i){
 let res=await allreviews(i)
 console.log(res)
 setreview(res.data)
}
function addreview(i){
  navigate(`/addreview?id=${i}`)
}

useEffect(()=>{fetchrecipedetail()},[])

  return (
    <div>
      <div class="container w-50 mx-auto pt-5 mt-5 mb-3">
        <div class="bg-light">
          <img src={recipe.image} class="border border-1 py-5 px-5 rounded rounded- 5p-3"style={{width:"100%",height:"400px"}}></img>
          <div class="p-5">
            <table class="table table-bordered mt-2">
              <tbody>
                <tr><th>Recipe Name</th><td>{recipe.recipe_name}</td></tr>
                <tr> <th>Ingredients</th><td>{recipe.recipe_ingredients}</td></tr>
                <tr> <th>Instructions</th><td>{recipe.instructions}</td></tr>
                <tr> <th>Meal Type</th><td>{recipe.meal_type}</td></tr>
                <tr> <th>Cuisine</th><td>{recipe.recipe_cuisine}</td></tr>
              </tbody>
            </table>
          </div>
      <div class="d-flex justify-content-around ">
            <button class="btn btn-outline-dark" onClick={()=>deleterecipe(recipe.id)}>Delete</button>
            <button class="btn btn-outline-dark" onClick={()=>editrecipe(recipe.id)}>Edit</button>
            <button class="btn btn-outline-dark" onClick={()=>reviews(recipe.id)}>Reviews</button>
            <button class="btn btn-outline-dark" onClick={()=>addreview(recipe.id)}>Add Review</button>
           
       </div>
       {Array.isArray(review)? 
       <div class="mt-4 w-75 mx-auto">
<h4>Top listed Reviews</h4>
{review.map((s)=><div class="p-3 border border-top-1 border-dark">
  <strong>{s.name}</strong><br></br>
  <strong>{'*'.repeat(s.rating)}</strong><br></br>
  <strong>{s.comment}</strong><br></br>
  <strong>Reviewed on {s.date}</strong><br></br>
</div>)}</div>:<div></div>}
       


        </div>
        
        
        </div>

      </div>

  
  )
}

export default Detail