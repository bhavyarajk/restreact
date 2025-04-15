import React from 'react'
import { useState } from 'react'
import { addrecipedetails } from '../services/Apicall'
function Add() {
    const [recipe,setrecipe]=useState({recipe_name:'',recipe_ingredients:'',meal_type:'',recipe_cuisine:'',instructions:'',image:null})
  
    async function addrecipe(event){
    event.preventDefault()
    // console.log(recipe)
    let res=await addrecipedetails(recipe)
    console.log(res)
  }
  
    return (
    <div>
        <div class="container w-50 fw-bold fs-5 text-light border border-1 border-danger shadow p-5">

            <h2 class="text-center text-light mt-2">Add Recipe Details</h2>
        <form onSubmit={addrecipe}>
           <div class="mb-3">
            <label class="form-label">Recipe Name</label>
            <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,recipe_name:event.target.value})}} placeholder="Enter Recipe name"></input>
           </div>
          
           <div class="mb-3">
            <label class="form-label">Ingredients</label>
            <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,recipe_ingredients:event.target.value})}} placeholder="Enter Recipe ingredients"></input>
           </div>
           <div class="mb-3">
            <label class="form-label">Instructions</label>
            <textarea class="form-control"  onChange={(event)=>{setrecipe({...recipe,instructions:event.target.value})}}>Enter Instructions</textarea>
           </div>
           <div class="mb-3">
            <label class="form-label">Meal Type</label>
            <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,meal_type:event.target.value})}} placeholder="Enter Recipe Meal type"></input>
           </div>
           <div class="mb-3">
            <label class="form-label">Cuisine</label>
            <input type="text" class="form-control" onChange={(event)=>{setrecipe({...recipe,recipe_cuisine:event.target.value})}} placeholder="Enter Recipe Cuisine"></input>
           </div>
           <div class="mb-3">
            <label class="form-label">Image</label>
            <input type="file" class="form-control" onChange={(event)=>{setrecipe({...recipe,image:event.target.files[0]})}}></input>
           </div>
           <div class="mb-3">
            <label class="form-label"></label>
            <input type="submit" class="form-control"></input>
           </div>
           
        </form>
         

        </div>

    </div>
  )
}

export default Add