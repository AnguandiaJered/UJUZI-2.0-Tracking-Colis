import React, { useState } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addLocalisation } from '../redux/actions/addData';
import { editLocalisation } from '../redux/actions/editData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';


const Localisation = (props) => {
 
    const { localisation, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        designation:"",
        longitude:"",
        latitude:""
      });
      const {designation,longitude,latitude} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

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
        dispatch(editLocalisation,data).then((response)=>{
            setMessage({
                title : response.data.message, 
                error : response.data.error
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
                  defaultValue={localisation ? localisation.designation : designation} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>              
                  <Input type="text" placeholder='Longitude' 
                  className='form-control' 
                  name='longitude' 
                  defaultValue={localisation ? localisation.longitude : longitude}
                  onChange={e => handleChange(e)} required/>
                </div>                
              </div>
              <div className='col-md-12'>
                <div className='form-group'>              
                  <Input type="text" placeholder='Latitude' 
                  className='form-control' 
                  name='latitude' 
                  defaultValue={localisation ? localisation.latitude : latitude} 
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
