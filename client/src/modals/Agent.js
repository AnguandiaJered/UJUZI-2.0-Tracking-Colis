import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addAgents } from '../redux/actions/addData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';



const Agent = (props) => {
 
    const { agent, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        noms:"",
        sexe:"",
        datenaissance:"",
        adresse:"",
        etatcivil:"",
        telephone:"",
        mail:"",
        fonction:"",
        id : new Date()
      });
      const {noms,sexe,datenaissance,adresse,etatcivil,telephone,mail,fonction} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

      useEffect(()=>{
          if(agent){
              setData({...agent})
          }
      },[])

    const [message, setMessage] = useState({
        title : "", error : ""
    });

    const dispatch = useDispatch()

    const onSubmitAgent = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addAgents(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
           
    }
  
    const UpdateAgent = (e)=>{
      e.preventDefault()
      axios.put(`http://localhost:8000/agent/${agent._id}`,data).then((res)=>{
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
              <div className='col-md-6'>
                <div className='form-group'>              
                  <Input type="text" placeholder="Entrer les noms"
                  className='form-control' 
                  name='noms' value={noms}
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                  
                   <select className='form-control' 
                   name='sexe' value={sexe}
                  onChange={e => handleChange(e)}> 
                     <option value="">None</option>
                     <option value='M'>M</option>
                     <option value='F'>F</option>
                   </select>               
                </div>
                <div className='form-group'>                 
                  <Input type="date" 
                  className='form-control' 
                  name='datenaissance' 
                  value={datenaissance}
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                 
                  <Input type="text" placeholder='Adresse' 
                  className='form-control mt-3' 
                  name='adresse' value={adresse}
                  onChange={e => handleChange(e)} required/>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>                  
                   <select className='form-control' 
                   name='etatcivil' 
                   value={etatcivil}
                  onChange={e => handleChange(e)}> 
                     <option value="">None</option>
                     <option value='Célibataire'>Célibataire</option>
                     <option value='Marié'>Marié</option>
                     <option value='Autres'>Autres</option>
                   </select>               
                </div>
                <div className='form-group'>                   
                    <Input type="tel" placeholder='+243...' 
                    className='form-control' 
                    name='telephone' value={telephone}
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                   
                    <Input type="email" placeholder='Email...' 
                    className='form-control' 
                    name='mail' value={mail} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                   
                    <Input type="text" placeholder='Fonction...' 
                    className='form-control' 
                    name='fonction' value={fonction} 
                    onChange={e => handleChange(e)} required/>
                </div>
              </div>
            </div>
            <FormControl className='col-md-6'>
              {
                !agent && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitAgent(e)} style={{marginRight:"10px"}}>
                {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                agent && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdateAgent(e)}>Modifier</button>
              }
            </FormControl>
          </form>   
        </div>
    )
    
}
export default Agent;
