import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addUsers } from '../redux/actions/addData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';



const Users = (props) => {
 
    const { users, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        noms:"",
        email:"",
        password:"",
        role:"",
        id : new Date()
      });
      const {noms,email,password,role} = data;
        
      const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

      useEffect(()=>{
          if(users){
              setData({...users})
          }
      },[])

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitUsers = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addUsers(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)           
    }

    const UpdateUsers = (e)=>{
      e.preventDefault()
      axios.put(`http://localhost:8000/users/${users._id}`,data).then((res)=>{
          setMessage({
              title : res.data.message, 
              error : res.data.error
          })
      })
      e.preventDefault();
  }
    
    return(
        <div className="container-fluid">           
             {message.error !== "" && 
                <Alert variant="filled" style={{marginBottom:"10px"}} severity={message.error}>
                    <h6>{message.title}</h6>
                </Alert>}
        <form>
            <div className='row'>
              <div className='col-md-12'>
                <FormControl className='col-md-12'>              
                  <Input type="text" placeholder="Entrer les noms"
                  className='form-control' 
                  name='noms' value={noms}
                  onChange={e => handleChange(e)} required/>
                </FormControl>
                <FormControl className='col-md-12'>                 
                  <Input type="email" placeholder='Email' 
                  className='form-control mt-3' 
                  name='email' value={email}
                  onChange={e => handleChange(e)} required/>
                </FormControl>                
              </div>
              <div className='col-md-12'>
                <FormControl className='col-md-12'>                    
                    <Input type="password" placeholder='Password' 
                    className='form-control mt-3' 
                    name='password' 
                    value={password} 
                    onChange={e => handleChange(e)} required/>
                </FormControl>
                <FormControl className='col-md-12'>                   
                    <Input type="text" placeholder='Role' 
                    className='form-control mt-3' 
                    name='role' value={role}
                    onChange={e => handleChange(e)} required/>
                </FormControl>
              </div>
            </div>
            <FormControl className='col-md-6'>
              {
                !users && <button className="btn btn-success mt-3" disabled={loading} onClick={(e) => onSubmitUsers(e)} style={{marginRight:"10px"}}>
                {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                users && <button className="btn btn-success mt-3" onClick={(e)=> UpdateUsers(e)}>Modifier</button>
              }
            </FormControl>
          </form>       
        </div>
    )
    
}
export default Users;
