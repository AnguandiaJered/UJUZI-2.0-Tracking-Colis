import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { FormControl, Input, InputLabel } from '@mui/material';
import axios from "axios";
import Alert from '@mui/material/Alert';


const Login = () => {


    const [loading, setLoading] = useState(false)
    const [data,setData] = useState({
        email:"",
        password:""
      });
      const {email,password} = data;
        const handleChange = e =>{
            setData({...data,[e.target.name] : e.target.value});
        }

    const [message, setMessage] = useState({
        title : "", error : ""
    });


    const onSubmit = async (e)=>{
        e.preventDefault()   
        setLoading(true)
            await axios.post('http://localhost:8000/users/singin', data)
                .then(res=>{
                    localStorage.setItem("token", res.data.token);                    
                    localStorage.setItem("token", true)
                    setMessage({
                        title : res.data.message, 
                        error : res.data.error
                    }) 
                    window.location.replace("/");
                })              
            setLoading(false)   
    }
    const required = value => {
        if (!value) {
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
      };

        return (
            <div>
                <div className="login">
                    <div className="container">               
                        <div className="row">
                            <div className="col-md-6 offset-3 mt-5">
                            {message.error !== "" && 
                            <Alert variant="filled" style={{marginBottom:"10px"}} severity={message.error}>
                                <h6>{message.title}</h6>
                            </Alert>}
                                <div className="portlet-green mt-5 ">
                                    <div className="login-heading">
                                        <div className="title text-center">
                                            <h4>
                                                <strong> <i className="fa fa-gears"></i>  Ujuzi Tracking!</strong>
                                            </h4>
                                        </div>                                    
                                    </div>
                                    <div className="col-md-11 mt-5 ml-4">
                                        <form >
                                            <div className="">
                                                <div className="form-group">
                                                    <Input className="form-control" 
                                                    placeholder="E-mail" name="email" 
                                                    type="text" value={email} 
                                                    onChange={e => handleChange(e)} 
                                                    validations={[required]} />
                                                </div>
                                                <div className="form-group">
                                                    <Input className="form-control" 
                                                    placeholder="Password" 
                                                    name="password" 
                                                    type="password" 
                                                    value={password} 
                                                    onChange={e => handleChange(e)} 
                                                    validations={[required]} />
                                                </div>
                                                <div>
                                                    <InputLabel className="remember">
                                                        <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
                                                    </InputLabel>
                                                </div>
                                            <FormControl className="form-group mt-4 col-md-12">
                                                    <button onClick={(e) => onSubmit(e)} className="btn btn-green col-md-10 text-white">Sign In</button>
                                            </FormControl>                                            
                                            </div>                                     
                                            <p className="small mt-3">
                                                <Link to="#" className="text-green">Forgot your password?</Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        )
    }



export default Login;