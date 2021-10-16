import React,{Fragment, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';


const Login = ()=>{
    const [FormData,setFormData] = useState({
        email:'',
        password:''
    })
    
 

    const emailHandler = (e)=>{
        setFormData({...FormData,email:e.target.value});
    };
    const passwordHandler = (e)=>{
        setFormData({...FormData,password:e.target.value});
    };
  

    const submitHandler= async (e)=>{
        e.preventDefault();
        console.log('success');
        
    }


    return(
       <Fragment>
            <h1 className="large text-primary">Sign</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In</p>
            <form className="form" onSubmit={submitHandler}>
             
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" onChange={emailHandler} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        onChange={passwordHandler}
                    />
                </div>
          
                <input type="submit" className="btn btn-primary" value="Login" />'
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
       </Fragment>
    )
}

export default Login;