import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { getrecipdetail, updaterecipedetails } from '../services/Apicall';

function Update() {
  const [recipe,setrecipe]=useState({recipe_name:'',recipe_ingredients:'',meal_type:'',recipe_cuisine:'',instructions:'',image:null})
  
  const {search}=useLocation() //useLocation hook used to get the location/address details.
  // To get querystring starting with ?
 //we use const {search}=UseLocation
//we get the result as ?id=idvalue
const navigate=useNavigate()

const queryParams=new URLSearchParams(search)  // it used to change into object format{'id':idvalue}    

const id=queryParams.get('id')

console.log(id)

async function fetchrecipedetail(){
  let res=await getrecipdetail(id)
  console.log(res)
  setrecipe(res.data)
}
async function update(event){
  event.preventDefault()
  console.log(recipe)

  let recipe1={...recipe}

  if(typeof recipe.image=="string"){

    delete recipe1.image

  }

  let res=await updaterecipedetails(id,recipe1)
  console.log(res)

  navigate('/')

}



  

useEffect(()=>{fetchrecipedetail()},[])

  return (
    <div><div class="container w-50 fw-bold fs-5 text-light border border-1 border-danger shadow p-5">

    <h2 class="text-center text-light mt-2">Add Recipe Details</h2>
<form onSubmit={update}>
   <div class="mb-3">
    <label class="form-label">Recipe Name</label>
    <input type="text" value={recipe.recipe_name} class="form-control" onChange={(event)=>{setrecipe({...recipe,recipe_name:event.target.value})}} placeholder="Enter Recipe name"></input>
   </div>
  
   <div class="mb-3">
    <label class="form-label">Ingredients</label>
    <input type="text" value={recipe.recipe_ingredients} class="form-control" onChange={(event)=>{setrecipe({...recipe,recipe_ingredients:event.target.value})}} placeholder="Enter Recipe ingredients"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Instructions</label>
    <textarea class="form-control" value={recipe.instructions} onChange={(event)=>{setrecipe({...recipe,instructions:event.target.value})}}>Enter Instructions</textarea>
   </div>
   <div class="mb-3">
    <label class="form-label">Meal Type</label>
    <input type="text" value={recipe.meal_type} class="form-control" onChange={(event)=>{setrecipe({...recipe,meal_type:event.target.value})}} placeholder="Enter Recipe Meal type"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Cuisine</label>
    <input type="text" class="form-control" value={recipe.recipe_cuisine} onChange={(event)=>{setrecipe({...recipe,recipe_cuisine:event.target.value})}} placeholder="Enter Recipe Cuisine"></input>
   </div>
   <div class="mb-3">
    <label class="form-label">Image</label>
    <img src={recipe.image} height="100px" width="100px"></img>
    <input type="file" class="form-control" onChange={(event)=>{setrecipe({...recipe,image:event.target.files[0]})}}></input>
   </div>
   <div class="mb-3">
    <label class="form-label"></label>
    <input type="submit" class="form-control"></input>
   </div>
   
</form>
 

</div></div>
  )
}

export default Update