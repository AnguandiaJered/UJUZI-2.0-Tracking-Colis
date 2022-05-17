import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addExpedition } from '../redux/actions/addData';
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
        author:"",
        id : new Date()
      });
      const {client,colis,destination,dateExpedition,nomsclient,adresse,telephone,mail,heuredepart,heurearrivee,author} = data;
        
      const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }
      
        useEffect(()=>{
          if(expedition){
              setData({...expedition})
          }
      },[])

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
      axios.put(`http://localhost:8000/expedition/${expedition._id}`,data).then((res)=>{
          setMessage({
              title : res.data.message, 
              error : res.data.error
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
                  value={client} 
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
                  value={colis}
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
                  value={destination} 
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
                  value={dateExpedition} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder="Entrer les noms"
                    className='form-control' 
                    name='nomsclient' 
                    value={nomsclient}
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='Adresse' 
                    className='form-control' 
                    name='adresse' 
                    value={adresse}
                    onChange={e => handleChange(e)} required/>
                </div>
              </div>
              <div className='col-md-6'>             
                <div className='form-group'>                    
                    <Input type="tel" placeholder='+243...' 
                    className='form-control' 
                    name='telephone' 
                    value={telephone} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="email" placeholder='Email' 
                    className='form-control' 
                    name='mail' 
                    value={mail}
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='heure de depart' 
                    className='form-control' 
                    name='heuredepart' 
                    value={heuredepart} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='heure arrivée' 
                    className='form-control' 
                    name='heurearrivee' 
                    value={heurearrivee} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                  
                   <select className='form-control' 
                   name='author' 
                  value={author} 
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
