import React, { useEffect, useState } from 'react'
import { deletebookdetail, getallbooks } from '../services/Apicall'
import { useNavigate } from 'react-router-dom'

function View() {
    const [books,setbook]=useState([])
    const navigate=useNavigate()

    function detail(i){
// console.log(i)

navigate(`/detail?id=${i}`)

    }

    async function fetchbooks(){

        let s=await getallbooks()
        
        setbook(s.data)
    }

    async function deletebook(i){
      console.log(i)
      let res=await deletebookdetail(i)
      if(res.status >199 && res.status<399)//if successful execution
        {
      fetchbooks()}

      else{ //if any error
        alert("Cant delete book record.Try again......")
      }

    }
    function edit(i)
    {
      navigate(`/edit?id=${i}`)
    }


useEffect(()=>{fetchbooks()},[])  //useEffect Hook  calls function fetchbooks()
                                      //when view component is loaded/rendered
 
return (
    <div><div class="container mt-1 w-75 bg-secondary text-light p-3">
    <h3>Book List</h3>
    <table class="table table-bordered text-light">
      <thead>
      <tr>
        <th>IMAGE</th>
        <th>TITLE</th>
        <th>AUTHOR</th>
        <th>PAGES</th>
        <th>PRICE</th>
        <th>LANGUAGE</th>
        <th>ACTIONS</th>
      </tr></thead>
      <tbody>

        {books.map((i)=><tr>
          <td><img src={i.image} height="100px" width="100px"></img></td>
          <td>{i.title}</td>
          <td>{i.author}</td>
          <td>{i.pages}</td>
          <td>{i.price}</td>
          <td>{i.language}</td>
          <td><button class="btn btn-light me-2 mt-2" onClick={()=>detail(i.id)}>View</button><button class="btn btn-light me-2 mt-2" onClick={()=>edit(i.id)}>Edit</button><button onClick={()=>deletebook(i.id)} class="btn btn-light mt-2 me-2">Delete</button></td>
          </tr>)}
        
        
      </tbody>
    </table>
    </div></div>



  )
}

export default View