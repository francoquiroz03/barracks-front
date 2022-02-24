import React, { useState, useEffect } from 'react';
import {signin, authenticate, isAuthenticated} from "../auth";
import {Redirect, Link} from "react-router-dom";
import Cookies from "universal-cookie";
import '../css/Signin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const cookies = new Cookies();

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const loadUser = () => {
        if(cookies.get("jwt")){
            setValues({
                ...values,
                role: cookies.get("jwt").user.role,
                redirectToReferrer: true
            });
        }
    };

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    useEffect(() => {
        loadUser();
    }, []);

    const clickSubmit = event => {
        if(!email || !password) {
            setValues({ ...values, error: '', loading: false});
        }else{
            event.preventDefault();
            setValues({ ...values, error: false, loading: true });
            signin({ email, password }).then(data => {
                if( data.error ) {
                    setValues({ ...values, error: data.error, loading: false});
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    });
                }
            });
        }
    };

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none"}}
        >
            {error}
        </div>
    );

    const showLoading = () => 
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if(redirectToReferrer) {
            if (user && user.role === 'ADMIN_ROLE') {
                return <Redirect to="/admin/dashboard" />  
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/"/>
        }
    };

    return (
        <form>
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Email: </label><br />
                        <input type="email" className="form-control" name="email" onChange={handleChange("email")} required/> <br />
                        <label>Password: </label><br />
                        <input type="password" className="form-control" name="password"  onChange={handleChange("password")} required/>
                        <br />
                        <button onClick={clickSubmit} className="btn btn-primary"> Login </button>
                    </div>
                <div>
                <Link className="nav-link" to="/signup">Signup</Link>
                </div>
                    {showLoading()}
                    {showError()}
                    {redirectUser()}
                </div>
            </div>
        </form>
    );  
};

export default Login;