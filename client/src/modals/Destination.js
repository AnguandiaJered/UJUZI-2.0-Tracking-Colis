import React, { useState } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addDestination } from '../redux/actions/addData';
import { editDestination } from '../redux/actions/editData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';


const Destination = (props) => {
 
    const { destination, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        designation:""
      });
      const {designation} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

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
        e.preventDefault();
        dispatch(editDestination(data)).then((res)=>{
            setMessage({
                title : res.data.message, 
                error : res.data.error
            })
        })
        e.preventDefault();
    }
    const {id}= useParams();

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
                  defaultValue={destination ? destination.designation : designation} 
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
