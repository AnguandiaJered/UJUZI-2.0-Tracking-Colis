import React,{ useState } from "react";
import { FormControl, Input, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addEmails } from '../redux/actions/addData';


const Message = () =>{

    const [messages,setMessages] = useState({
        name:"",
        email:"",
        message:""
    });
    const {name,email,message} = messages;
    const handleChange = e =>{
        setMessages({...messages,[e.target.name] : e.target.value});
    }

    const dispatch = useDispatch();
    const onSubmit = async e =>{
      e.preventDefault();
        if(message) {
          const data = message;
          await dispatch(addEmails(data));
          setMessages("");              
        }    
    }


    return(
        <>
            <div className='dashboard container-fluid'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-title mt-3 ml-4">
                            <h1 className="titre">SYSTEM TRACKING COLIS
                                <small className="ml-3">Ujuzi Tracking</small>
                            </h1>
                            <div className="container-fluid">
                                <ol className="breadcrumb">
                                    <li className="active"><i className="fa fa-dashboard"></i> Dashboard / Messages</li>
                                </ol>
                            </div>                            
                        </div>
                    </div>
                </div>           
                
                <div className="container mt-3">                    
                    <form className="ml-5" onSubmit={e => onSubmit(e)}>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='form-group'>
                                     <InputLabel>Company</InputLabel>             
                                    <Input type="text" placeholder='Company' 
                                        className='form-control' 
                                        name='name' value={name} 
                                        onChange={e => handleChange(e)} required/>
                                </div>
                                <div className='form-group'>
                                    <InputLabel>Email</InputLabel>                   
                                    <Input type="email" placeholder='Email...' 
                                    className='form-control' 
                                    name='email' value={email} 
                                    onChange={e => handleChange(e)} required/>
                                </div>
                                <div className='form-group'>
                                    <InputLabel>Message</InputLabel>                 
                                    <textarea name="message" cols="30" rows="7" 
                                    className="form-control" placeholder="Message..." 
                                    value={message}
                                    onChange={e => handleChange(e)}></textarea>     
                                </div>
                            </div>                           
                        </div>                
                        <FormControl className='col-md-4'>
                            <Input type="submit" value="Enregistrer" className='btn btn-success mt-3' />
                        </FormControl>
                    </form>    
                </div>
            </div>
        </>
    )
}

export default Message;