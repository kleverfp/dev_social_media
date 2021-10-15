import React,{Fragment, useState} from "react";



const Register = ()=>{
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

    const submitHandler=(e)=>{
        e.preventDefault();
        if(FormData.password !== FormData.password2)
            console.log("Passwords do not match");
            
        console.log(FormData);
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
                Already have an account? <a href="login.html">Sign In</a>
            </p>
       </Fragment>
    )
}

export default Register;