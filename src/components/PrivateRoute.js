import React from "react"
import { cookies } from '../actions/auth-actions';
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated =  cookies.get('isAuthenticated');
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  )
}

export default  PrivateRoute;