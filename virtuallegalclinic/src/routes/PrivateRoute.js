import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { loggedIn } = useAuth();
  
    return (
      <Route
        {...rest}
        render={props =>
          loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }

export default PrivateRoute;