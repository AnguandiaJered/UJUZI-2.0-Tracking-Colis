import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addDestination } from '../redux/actions/addData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';


const Destination = (props) => {
 
    const { destination, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        designation:"",
        id : new Date()
      });
      const {designation} = data;

      const handleChange = e =>{
          setData({...data,[e.target.name] : e.target.value});
      }

      useEffect(()=>{
        if(destination){
            setData({...destination})
        }
    },[])

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitDestination = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addDestination(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)            
    }
  
    const UpdateDestination = (e)=>{
      e.preventDefault()
      axios.put(`http://localhost:8000/destination/${destination._id}`,data).then((res)=>{
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
              </div>              
            </div>
            <FormControl className='col-md-6'>
              {
                !destination && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitDestination(e)} style={{marginRight:"10px"}}>
                {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                destination && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdateDestination(e)}>Modifier</button>
              }
            </FormControl>
          </form>       
        </div>
    )
    
}
export default Destination;
