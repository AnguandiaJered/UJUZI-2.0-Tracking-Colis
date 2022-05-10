import React, { useState } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addClients } from '../redux/actions/addData';
import { editClients } from '../redux/actions/editData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useParams } from "react-router-dom";



const Client = (props) => {
 
    const { client, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        noms:"",
        sexe:"",
        adresse:"",
        telephone:"",
        mail:""
      });
      const {noms,sexe,adresse,telephone,mail} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitClient = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addClients(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
            
    }
    const {id}= useParams();
    // const UpdateClient = (e)=>{
    //     e.preventDefault()
    //     dispatch(editClients,data).then((response)=>{
    //         setMessage({
    //             title : response.data.message, 
    //             error : response.data.error
    //         })
    //     })
    //     e.preventDefault();
    // }
    const UpdateClient = async (e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/client/${id}`,data).then((res) =>{
            setData(res.data);
        });
    };

    return(
        <div className="container-fluid">

             {message.error !== "" && 
                <Alert variant="filled" style={{marginBottom:"10px"}} severity={message.error}>
                    <h6>{message.title}</h6>
                </Alert>}
            <form>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>              
                            <Input type="text" placeholder= "Entrer les noms" 
                            className='form-control' 
                            name='noms'  defaultValue={client ? client.noms : noms}
                            onChange={e => handleChange(e)} required/>
                        </div>
                        <div className='form-group'>                  
                            <select className='form-control' 
                            name='sexe' 
                            defaultValue={client ? client.sexe : sexe} 
                            onChange={e => handleChange(e)}> 
                                <option value="">None</option>
                                <option value='M'>M</option>
                                <option value='F'>F</option>
                            </select>               
                        </div>
                        <div className='form-group'>                 
                            <Input type="text" placeholder='Adresse' 
                            className='form-control' 
                            name='adresse' defaultValue={client ? client.adresse : adresse} 
                            onChange={e => handleChange(e)} required/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>                   
                            <Input type="tel" placeholder='+243...' 
                            className='form-control' 
                            name='telephone' defaultValue={client ? client.telephone : telephone} 
                            onChange={e => handleChange(e)} required/>
                        </div>
                        <div className='form-group'>                   
                            <Input type="email" placeholder='Email...' 
                            className='form-control' 
                            name='mail' defaultValue={client ? client.mail : mail}
                            onChange={e => handleChange(e)} required/>
                        </div>
                    </div>
                </div>
                <FormControl className='col-md-6'>
                    {
                        !client && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitClient(e)} style={{marginRight:"10px"}}>
                        {loading && <Refresh/>} Enregistrer </button> 
                    }
                    {
                        client && <button className="btn btn-success boutton-classe" onClick={()=> UpdateClient(client._id)}>Modifier</button>
                    }
                </FormControl>
          </form>
        </div>
    )
    
}
export default Client;
