import React, { useState, useEffect } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addPaiement } from '../redux/actions/addData';
import { editPaiement } from '../redux/actions/editData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from "axios";


const Paiement = (props) => {
 
    const { paiement, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        client:"",
        colis:"",
        montant:"",
        libelle:"",
        datepaiement:"",
        author:""
      });
      const {client,colis,montant,libelle,datepaiement,author} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitPaiement = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addPaiement(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
            
    }
  
    const UpdatePaiement = (e)=>{
        e.preventDefault()
        dispatch(editPaiement,data).then((response)=>{
            setMessage({
                title : response.data.message, 
                error : response.data.error
            })
        })
        e.preventDefault();
    }

    const [rows, setRows] = useState([])
    const [colise, setColise] = useState([]);
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
              <div className='col-md-12'>             
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
                    <Input type="number" placeholder={paiement ? paiement.montant : "Entrer le montant"} 
                    className='form-control' 
                    name='montant' value={montant} 
                    onChange={e => handleChange(e)} required/>
                </div>
              </div>
              <div className='col-md-12'>              
                <div className='form-group'>                    
                    <Input type="text" placeholder='libelle' 
                    className='form-control' 
                    name='libelle' value={libelle} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>              
                  <Input type="date" 
                  className='form-control' 
                  name='datepaiement' value={datepaiement} 
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
                !paiement && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitPaiement(e)} style={{marginRight:"10px"}}>
                {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                paiement && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdatePaiement(e)}>Modifier</button>
              }
            </FormControl>
          </form>       
        </div>
    )
    
}
export default Paiement;
