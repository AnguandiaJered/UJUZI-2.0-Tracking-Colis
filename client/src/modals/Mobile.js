import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addMobile } from '../redux/actions/addData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from "axios";


const Mobile = (props) => {
 
    const { mobile, setEnregistrement } = props
    console.log(mobile)

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        matricule:"",
        modele:"",
        marque:"",
        moteur:"",
        id : new Date()
      });
      const {matricule,modele,marque,moteur} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

    useEffect(()=>{
        if(mobile){
            setData({...mobile})
        }
    },[])

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitMobile = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addMobile(data)
                ).then(res=>{
                    console.log(res)
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
            
    }

    const UpdateMobile = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/mobile/${mobile._id}`,data).then((res)=>{
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
                            <Input type="text" placeholder= "Entrer le mobile" 
                            className='form-control' 
                            name='matricule'  
                            value={matricule}
                            onChange={e => handleChange(e)} required/>
                        </div>                 
                        <div className='form-group'>                 
                            <Input type="text" placeholder='Modele' 
                            className='form-control' 
                            name='modele' 
                            value={modele} 
                            onChange={e => handleChange(e)} required/>
                        </div>
                    </div>
                    <div className='col-md-12'>
                        <div className='form-group'>                   
                            <Input type="text" placeholder='Marque' 
                            className='form-control' 
                            name='marque' 
                            value={marque} 
                            onChange={e => handleChange(e)} required/>
                        </div>
                        <div className='form-group'>                   
                            <Input type="email" placeholder='Moteur' 
                            className='form-control' 
                            name='moteur' 
                            value={moteur}
                            onChange={e => handleChange(e)} required/>
                        </div>
                    </div>
                </div>
                <FormControl className='col-md-6'>
                    {
                        !mobile && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitMobile(e)} style={{marginRight:"10px"}}>
                        {loading && <Refresh/>} Enregistrer </button> 
                    }
                    {
                        mobile && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdateMobile(e)}>Modifier</button>
                    }
                </FormControl>
          </form>
        </div>
    )
    
}
export default Mobile;
