import React, { useState } from "react";
import { Refresh } from "@material-ui/icons"
import { useDispatch } from 'react-redux';
import { addColis } from '../redux/actions/addData';
import { editColis } from '../redux/actions/editData';
import { FormControl, Input } from '@mui/material';
import Alert from '@mui/material/Alert';


const Colis = (props) => {
 
    const { colis, setEnregistrement } = props

    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        designation:"",
        nombrecolis:"",
        poids:"",
        naturecolis:"",
        codecolis:""
      });
      const {designation,nombrecolis,poids,naturecolis,codecolis} = data;
      const handleChange = e =>{
          setData({...data,[e.target.name] : e.target.value});
      }

    const [message, setMessage] = useState({
        title : "", error : ""
    });
    const dispatch = useDispatch()
    const onSubmitColis = async (event)=>{
        event.preventDefault()   
        setLoading(true)
            await dispatch(addColis(data)
                ).then(res=>{
                    setEnregistrement(res.data.message)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    })
                })
            setLoading(false)
    }
  
    const UpdateColis = (e)=>{
        e.preventDefault()
        dispatch(editColis,data).then((response)=>{
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
              <div className='col-md-12'>
                <div className='form-group'>              
                  <Input type="text" placeholder={colis ? colis.designation : "Entrer la designation"} 
                  className='form-control' 
                  name='designation' value={designation} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>              
                  <Input type="number" placeholder='Nombre colis' 
                  className='form-control' 
                  name='nombrecolis' value={nombrecolis} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>              
                  <Input type="number" placeholder='Poids' 
                  className='form-control' 
                  name='poids' value={poids} 
                  onChange={e => handleChange(e)} required/>
                </div>
              </div>
              <div className='col-md-12'>
                <div className='form-group'>              
                  <Input type="text" placeholder='nature de colis' 
                  className='form-control' 
                  name='naturecolis' value={naturecolis} 
                  onChange={e => handleChange(e)} required/>
                </div>
                <div className='form-group'>              
                  <Input type="number" placeholder='code de colis' 
                  className='form-control' 
                  name='codecolis' value={codecolis} 
                  onChange={e => handleChange(e)} required/>
                </div>
              </div>
            </div>
            <FormControl className='col-md-6'>
              {
                !colis && <button className="btn btn-success" disabled={loading} onClick={(e) => onSubmitColis(e)} style={{marginRight:"10px"}}>
                {loading && <Refresh/>} Enregistrer </button> 
              }
              {
                colis && <button className="btn btn-success boutton-classe" onClick={(e)=> UpdateColis(e)}>Modifier</button>
              }
            </FormControl>
          </form>        
        </div>
    )
    
}
export default Colis;
