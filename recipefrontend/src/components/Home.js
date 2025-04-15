import React, { useEffect, useState } from 'react'
import { getallrecipes } from '../services/Apicall'
import {useNavigate}from 'react-router-dom'
function Home() {
  const [recipe,setrecipe]=useState([])
  const navigate=useNavigate()


 function addrecipe()
 {
  navigate('/add')
 }


  async function fetchrecipes(){
    // console.log('hello')
    let res=await getallrecipes()
    console.log(res)
    setrecipe(res.data)
  }
  function detailrecipe(i){
    //console.log(i)
    navigate(`/detail?id=${i}`)
    
  }


  useEffect(()=>{fetchrecipes()},[])
  return (
    <div><div class="container border border-1 border-danger shadow pt-3">

      <h2 class="text-center text-light mt-2 mb-4 fw-bold">Available Recipes</h2>
      <div class="row">
      {recipe.map((s)=><div class="col-4">
        <div class="card mx-auto mt-3 p-3 border boder-2 border-dark rounded" style={{width: "20rem"}}>
  <img src={s.image} class="card-img-top" style={{width:"100%",height:"250px"}}></img>
  <div class="card-body text-center">
    <h5 class="card-title">{s.recipe_name}</h5>
    
    <a href="#" class="btn btn-primary text-center" onClick={()=>{detailrecipe(s.id)}}>Details</a>
  </div>
</div></div>)}

</div>

<div class="d-flex justify-content-center mt-5 mb-3">
  <button  class="btn btn-primary text-light fw-bold fs-6" onClick={addrecipe}>Add New Recipe</button>
</div>
  </div></div>
  )
}

export default Home