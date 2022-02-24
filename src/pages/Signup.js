import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import '../css/Signin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { email, password, success, error, loading} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = event => {
        if(!email || !password) {
            setValues({ ...values, error: '', loading: false});
        }else{
            event.preventDefault();
            setValues({ ...values, error:false, loading: true })
            signup({email, password }).then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error, success: false, loading: false});
                } else {
                    setValues({
                       ...values,
                       email: "",
                       password: "",
                       error: "",
                       success: true, 
                       loading: false
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

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{display: success ? "" : "none"}}
        >
            New account is creted. Please <Link to="/signin">Signin</Link> 
        </div>
    );   
    
    const showLoading = () => 
    loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    );

    return (
        <form>
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Email: </label><br />
                        <input type="email" className="form-control"  name="email" onChange={handleChange("email")} required/> <br />
                        <label>Password: </label><br />
                        <input type="password" className="form-control" name="password"  onChange={handleChange("password")} required/>
                        <br />
                        <button onClick={clickSubmit} className="btn btn-primary"> Register </button>
                    </div>
                <div>
                <Link className="nav-link" to="/signin">Signin</Link>
                </div>
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                </div>
            </div>
        </form>
    );
};

export default Signup;