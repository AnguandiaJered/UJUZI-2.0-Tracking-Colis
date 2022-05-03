import React, { useState } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addExpedition } from '../redux/actions/addData';
import { editExpedition } from '../redux/actions/editData';
import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import { FormControl, Input } from '@mui/material';
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
        heurearrivee:""
      });
      const {client,colis,destination,dateExpedition,nomsclient,adresse,telephone,mail,heuredepart,heurearrivee} = data;
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
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
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
                   <Select className='form-control' 
                   name='client' 
                  value={client} 
                  onChange={e => handleChange(e)}> 
                     <MenuItem>Selectionner un client</MenuItem>
                     <MenuItem value={client}>{client}</MenuItem>                    
                   </Select>               
                </div>
                <div className='form-group'>                  
                   <Select className='form-control' 
                   name='colis' 
                  value={colis} 
                  onChange={e => handleChange(e)}> 
                     <MenuItem>Selectionner un colis</MenuItem>
                     <MenuItem value={colis}>{colis}</MenuItem>                    
                   </Select>               
                </div>
                <div className='form-group'>                  
                   <Select className='form-control' 
                   name='destination' 
                  value={destination} 
                  onChange={e => handleChange(e)}> 
                     <MenuItem>Selectionner un destination</MenuItem>
                     <MenuItem value={destination}>{destination}</MenuItem>                    
                   </Select>               
                </div>
                <div className='form-group'>              
                  <Input type="date" 
                  className='form-control' 
                  name='dateExpedition' value={dateExpedition} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder={expedition ? expedition.nomsclient : "Entrer les noms"} 
                    className='form-control' 
                    name='nomsclient' value={nomsclient} 
                    onChange={e => handleChange(e)} required/>
                </div>
              </div>
              <div className='col-md-6'>              
                <div className='form-group'>                    
                    <Input type="text" placeholder='Adresse' 
                    className='form-control' 
                    name='adresse' value={adresse} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="tel" placeholder='+243...' 
                    className='form-control' 
                    name='telephone' value={telephone} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="email" placeholder='Email' 
                    className='form-control' 
                    name='mail' value={mail} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='heure de depart' 
                    className='form-control' 
                    name='heuredepart' value={heuredepart} 
                    onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>                    
                    <Input type="text" placeholder='heure arrivée' 
                    className='form-control' 
                    name='heurearrivee' value={heurearrivee} 
                    onChange={e => handleChange(e)} required/>
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
