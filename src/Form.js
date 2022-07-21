import React,{useEffect, useState} from 'react'

import { useNavigate,useParams } from 'react-router';
import { GetUniqueContact,updateCont } from '../Admin/api/userApi';

import './FormAdmin.css'
const FormAdmin = () => {
  

    const {id}=useParams()
    console.log('idadmin',id)
    let navigate = useNavigate();

    const[fullName,setFullName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

//get unique user 
const getauniqueUser=async(accountid)=>{
const data = await GetUniqueContact(accountid)
console.log('uniqueid',data.getuser)
setFullName(data.getuser.fullName)
setEmail(data.getuser.email)
// setPassword(data.getuser.password)

}


useEffect(()=>{
  if(id){getauniqueUser(id);console.log('useeffectid',id)}


},[id])

const handleSubmit=async(accountid,newValue)=>{
  await updateCont(accountid,newValue);

// console.log('addingContact',handleSubmit),

 }


  return (
   
    <div style={{display:'flex',justifyContent:'space-between'}}>     
      {/* ***********************************************show update card  */}

      <div style={{marginRight:'10%'}}>  
    <div className="card">
    <img src="https://bible.institute/wp-content/themes/cera/assets/images/avatars/user-avatar.png" alt="John" style={{width:"100%"}}/>
    <h1   > {fullName}</h1>
    <p className="title">{email}</p>
    <p>łelcome</p>
   
  
  </div>
  </div>
{/* ***********************************************separation update form  */}


<div id="registration-form">
  <div className='fieldset'>
    <legend>Update your Profil</legend>
    <form >
      <div className='row'>
        <label for='firstname'>First Name</label>
        <input type="text" placeholder="First Name" name='firstname' id='firstname' value={fullName}
          onChange={(e)=>setFullName(e.target.value)}/>
      </div>


      <div class='row'>
        <label for="email">E-mail</label>
        <input type="text" placeholder="E-mail"  name='email' value={email}
          onChange={(e)=>setEmail(e.target.value)}/>
      </div>


      <div class='row'>
        <label for="cemail">Confirm your E-mail</label>
        <input type="text" placeholder="Confirm your password" name='password' value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
      </div>


      <button  onClick={()=>handleSubmit(id,{fullName,email,password},navigate('/AdminUser'))}>Register</button>
    </form>
  </div>
</div>


  </div>

  )
}

export default FormAdmin




// api part 
// //getunique user 
export const GetUniqueContact = async (id,value)=>{
    const token=localStorage.getItem('token');
    const {data} = await axios.get(`http://localhost:5008/auth/user/${id}`,value,{headers:{Authorization:token}})
    return data
}


//update one self 
export const updateCont = async(id,value)=>{
    const token=localStorage.getItem('token');
    const updatedContact = await axios.put(`http://localhost:5008/auth/user/update-admin/${id}`,value,{headers:{Authorization:token}})
    
}