import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().user.role === 'ADMIN_ROLE' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/user/dashboard",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AdminRoute;