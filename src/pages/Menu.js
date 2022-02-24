import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const Menu = () =>{
    const history = useHistory();

    const clickSubmit = event => {
        event.preventDefault();
        signout().then(() => {
            history.push("/");
        });
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                {isAuthenticated() && (
                    <li className="nav-item">
                        <button onClick={clickSubmit}
                        className="btn btn-primary"> Signout </button>
                    </li>
                )}
            </ul>
        </div>
     );
}

export default withRouter(Menu);