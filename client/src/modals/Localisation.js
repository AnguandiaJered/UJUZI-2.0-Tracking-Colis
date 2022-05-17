import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addLocalisation } from '../redux/actions/addData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';


const Localisation = (props) => {
 
    const { localisation, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        designation:"",
        longitude:"",
        latitude:"",
        id : new Date()
      });
      const {designation,longitude,latitude} = data;
        
      const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }
      
      useEffect(()=>{
        if(localisation){
              setData({...localisation})
          }
      },[])

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitLocalisation = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addLocalisation(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
            
    }

    const UpdateLocalisation = (e)=>{
      e.preventDefault()
      axios.put(`http://localhost:8000/localisation/${localisation._id}`,data).then((res)=>{
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
                <div className='form-group'>              
                  <Input type="text" placeholder="Entrer la designation"
                  className='form-control' 
                  name='designation' 
                  value={designation} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>              
                  <Input type="text" placeholder='Longitude' 
                  className='form-control' 
                  name='longitude' 
                  value={longitude}
                  onChange={e => handleChange(e)} required/>
                </div>                
              </div>
              <div className='col-md-12'>
                <div className='form-group'>              
                  <Input type="text" placeholder='Latitude' 
                  className='form-control' 
                  name='latitude' 
                  value={latitude} 
                  onChange={e => handleChange(e)} required/>
                </div>             
              </div>
            </div>
            <FormControl className='col-md-6'>
              {
                !localisation && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitLocalisation(e)} style={{marginRight:"10px"}}>
                {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                localisation && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdateLocalisation(e)}>Modifier</button>
              }
            </FormControl>
          </form>          
        </div>
    )
    
}
export default Localisation;
