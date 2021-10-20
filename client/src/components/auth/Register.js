import React,{Fragment, useState} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

const Register = ({setAlert,register})=>{
    const [FormData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })
    
    const nameHandler = (e)=>{
        setFormData({...FormData,name:e.target.value});
    };

    const emailHandler = (e)=>{
        setFormData({...FormData,email:e.target.value});
    };
    const passwordHandler = (e)=>{
        setFormData({...FormData,password:e.target.value});
    };
    const password2Handler = (e)=>{
        setFormData({...FormData,password2:e.target.value});
    };

    const submitHandler= async (e)=>{
        e.preventDefault();
        if(FormData.password !== FormData.password2)
            setAlert("Passwords do not match",'danger',10000);
        else{
            const {name,email,password} = FormData;
           register({name,email,password});
        }
    }


    return(
       <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" onChange={nameHandler} required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" onChange={emailHandler} />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small
                >
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
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    onChange={password2Handler}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />'
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
       </Fragment>
    )
}
Register.propTypes ={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired
}
export default connect(null,{setAlert,register})(Register);