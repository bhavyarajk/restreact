import axios from 'axios';


//GET,POST,PUT,DELETE

// axios.methodname(baseurl,data,Params,headers)

export async function getallbooks(){

  let token=localStorage.getItem('token')
   let h={'Authorization':token}

     
    return await axios.get("http://127.0.0.1:8000/books/",{'headers':h})
}


// promise object 
//3 state 



export async function postbookdetails(data){
    console.log(data)
    let token=localStorage.getItem('token')
    let h={'Authorization':token,'Content-Type':'multipart/form-data'}
    
   

  return await axios.post("http://127.0.0.1:8000/books/",data,{'headers':h})
}

export async function getbookdetail(id){
  let token=localStorage.getItem('token')
   let h={'Authorization':token}

  return await axios.get(`http://127.0.0.1:8000/books/${id}`,{'headers':h})

}

export async function editbookdetails(data,id)

{
  let token=localStorage.getItem('token')
  let h={'Authorization':token,'Content-Type':'multipart/form-data'}   //if data contains file data
    return await axios.put(`http://127.0.0.1:8000/books/${id}/`,data,{'headers':h})

}
export async function deletebookdetail(id){
  let token=localStorage.getItem('token')
  console.log(token)
  let h={'Authorization':token}

    return await axios.delete(`http://127.0.0.1:8000/books/${id}/`,{'headers':h})
}


export async function createuser(data){
  return await axios.post("http://127.0.0.1:8000/users/",data)
}


export async function userlogin(data){
  return await axios.post("http://127.0.0.1:8000/login/",data)
}



export async function userlogout(){
  let token=localStorage.getItem('token')
  let h={'Authorization':token}

  return await axios.get("http://127.0.0.1:8000/logout",{'headers':h})
}




export async function searchbook(w){
 
  console.log(w)
  let p={'search':w}

  return await axios.get("http://127.0.0.1:8000/search",{params:p})
}
