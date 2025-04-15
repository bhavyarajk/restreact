import axios from 'axios';


// axios.methodname(URL,data,Params,header)

export async function getallrecipes()

{
  console.log('hello')
  return await axios.get('http://127.0.0.1:8000/recipe/')

}

export async function getrecipdetail(id)

{
  console.log(id)
  return await axios.get(`http://127.0.0.1:8000/recipe/${id}/`)

}
export async function deleterecipedetail(id)

{
  console.log(id)
  return await axios.delete(`http://127.0.0.1:8000/recipe/${id}/`)

}

export async function searchrecipedetail(word)

{
  let p={'search':word}
  return await axios.get(`http://127.0.0.1:8000/recipe_search`,{params:p})

}
export async function addrecipedetails(data)

{
  console.log(data)
  let h={'content-type':'multipart/form-data'}
  return await axios.post("http://127.0.0.1:8000/recipe/",data,{headers:h})

}

export async function updaterecipedetails(id,data)

{
  console.log(data)
  let h={'content-type':'multipart/form-data'}
  return await axios.put(`http://127.0.0.1:8000/recipe/${id}/`,data,{headers:h})

}
export async function userregister(data)

{
  console.log(data)
  
  return await axios.post("http://127.0.0.1:8000/users/",data)}

  export async function userlogin(data)

{
  console.log(data)
  
  return await axios.post("http://127.0.0.1:8000/login/",data)}
  export async function userlogout()

  {
    let token=localStorage.getItem('token')
    let h={'Authorization':token}
    
    return await axios.get("http://127.0.0.1:8000/logout",{headers:h})}

    export async function allreviews(id)

    {
      
      console.log(id)
      return await axios.get(`http://127.0.0.1:8000/review_filter/${id}`)}
  
      export async function addreviewdetail(data)

      {
        let token=localStorage.getItem('token')
        let h={'Authorization':token}
        console.log(data)
        return await axios.post(`http://127.0.0.1:8000/create/`,data,{headers:h})}
    