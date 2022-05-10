import React, { useState,useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addExpedition } from '../redux/actions/addData';
import { editExpedition } from '../redux/actions/editData';
import { FormControl, Input } from '@mui/material';
import axios from "axios";
import Alert from '@mui/material/Alert';


const Expedition = (props) => {
 
    const { expedition, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        client:"",
        colis:"",
        destination:"",
        dateExpedition:"",
        nomsclient:"",
        adresse:"",
        telephone:"",
        mail:"",
        heuredepart:"",
        heurearrivee:"",
        author:""
      });
      const {client,colis,destination,dateExpedition,nomsclient,adresse,telephone,mail,heuredepart,heurearrivee,author} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitExpedition = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addExpedition(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
           
    }
  
    const UpdateExpedition = (e)=>{
        e.preventDefault()
        dispatch(editExpedition,data).then((response)=>{
            setMessage({
                title : response.data.message, 
                error : response.data.error
            })
        })
        e.preventDefault();
    }
    const [rows, setRows] = useState([])
    const [colise, setColise] = useState([]);
    const [destine, setDestine] = useState([]);
    const [person, setPerson] = useState([]);
    useEffect(()=>{
      axios.get('http://localhost:8000/client/all')
      .then(res =>{
        setRows(res.data.client)
      })
    },[rows])

    console.log(rows)
    useEffect(()=>{
      axios.get('http://localhost:8000/colis/all')
      .then(res =>{
        setColise(res.data.colis)
      })
    },[colise])
    useEffect(()=>{
      axios.get('http://localhost:8000/destination/all')
      .then(res =>{
        setDestine(res.data.destination)
      })
    },[destine])
    useEffect(()=>{
      axios.get('http://localhost:8000/agent/all')
      .then(res =>{
        setPerson(res.data.agent)
      })
    },[person])
    
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
                   <select className='form-control' 
                   name='client' 
                 defaultValue={expedition ? expedition.client : client} 
                  onChange={e => handleChange(e)}> 
                    <option value="">None</option> 
                    {
                        rows.map((item => (<option key={item.id}  value={item.noms}>{item.noms}</option>))
                        )                      
                    }                  
                   </select>               
                </div>
                <div className='form-group'>                  
                   <select className='form-control' 
                   name='colis' 
                  defaultValue={expedition ? expedition.colis : colis}
                  onChange={e => handleChange(e)}> 
                      <option value="">None</option>
                     {
                        colise.map((item => (<option key={item.id}  value={item.designation}>{item.designation}</option>))
                        )                      
                    }                     
                   </select>               
                </div>
                <div className='form-group'>                  
                   <select className='form-control' 
                   name='destination' 
                  defaultValue={expedition ? expedition.destination : destination} 
                  onChange={e => handleChange(e)}>
                     <option value="">None</option>
                     {
                        destine.map((item => (<option key={item.id}  value={item.designation}>{item.designation}</option>))
                        )
                    }                     
                   </select>               
                </div>
                <div className='form-group'>              
                  <Input type="date" 
                  className='form-control' 
                  name='dateExpedition' 
                  defaultValue={expedition ? expedition.dateExpedition : dateExpedition} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder="Entrer les noms"
                    className='form-control' 
                    name='nomsclient' 
                    defaultValue={expedition ? expedition.nomsclient : nomsclient} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='Adresse' 
                    className='form-control' 
                    name='adresse' 
                    defaultValue={expedition ? expedition.adresse : adresse} 
                    onChange={e => handleChange(e)} required/>
                </div>
              </div>
              <div className='col-md-6'>             
                <div className='form-group'>                    
                    <Input type="tel" placeholder='+243...' 
                    className='form-control' 
                    name='telephone' 
                    defaultValue={expedition ? expedition.telephone : telephone} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="email" placeholder='Email' 
                    className='form-control' 
                    name='mail' 
                    defaultValue={expedition ? expedition.mail : mail} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='heure de depart' 
                    className='form-control' 
                    name='heuredepart' 
                    defaultValue={expedition ? expedition.heuredepart : heuredepart} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='heure arrivée' 
                    className='form-control' 
                    name='heurearrivee' 
                    defaultValue={expedition ? expedition.heurearrivee : heurearrivee} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                  
                   <select className='form-control' 
                   name='author' 
                  defaultValue={expedition ? expedition.author : author} 
                  onChange={e => handleChange(e)}>
                     <option value="">None</option>
                     {
                        person.map((item => (<option key={item.id}  value={item.noms}>{item.noms}</option>))
                        )
                    }                     
                   </select>               
                </div>
              </div>
            </div>
            <FormControl className='col-md-6'>
              {
                !expedition && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitExpedition(e)} style={{marginRight:"10px"}}>
                 {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                expedition && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdateExpedition(e)}>Modifier</button>
              }
            </FormControl>
          </form>      
        </div>
    )
    
}
export default Expedition;
