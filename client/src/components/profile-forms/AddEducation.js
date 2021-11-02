import React, { Fragment, useState } from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData] = useState({

        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    });

    const [toDateDisabled,toggleToDateDisabled] =useState(false);

    const {school,degree,fieldofstudy,from,to,current,description} = formData;
    
    const onChangeHandler =(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
        if([e.target.name] =="current")
            toggleToDateDisabled(!toDateDisabled);
    };

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        addEducation(formData,history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Add your education</h1>
            <p className="lead">
            <i className="fas fa-code-branch"></i> Add any school or bootcamp that
            positions that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input type="text" placeholder="* School" name="school" value={school} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* degree" name="degree" value={degree} onChange={onChangeHandler} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="field of study" name="fieldofstudy" value={fieldofstudy} onChange={onChangeHandler} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from"  value={from} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={onChangeHandler} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} disabled={toDateDisabled} onChange={onChangeHandler}/>
                </div>
                <div className="form-group">
                    <textarea
                    name="description"
                    value={description}
                    onChange={onChangeHandler}
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation:PropTypes.func.isRequired,
}

export default connect(null,{addEducation})(withRouter(AddEducation))
