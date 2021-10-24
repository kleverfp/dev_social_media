import React, { Fragment } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout} from "../../actions/auth";
import ProtoTypes from 'prop-types';



const Navbar=({auth:{isAuthenticated,loading},logout})=>{

    const authLinks=
        (
        <ul>
        <li>
            <a onClick={logout}  href="#!">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">logout</span>
            </a>
           
        </li>
        </ul>);

    const guessLink =(
        <ul>
        <li><a href="#!">Developers</a></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        </ul>);

    return (
        <nav className="navbar bg-dark">
            <h1>
            <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks:guessLink}</Fragment>)}
        </nav>
    )
}
Navbar.ProtoTypes={
    logout:ProtoTypes.func.isRequired,
    auth:ProtoTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{logout})(Navbar);
