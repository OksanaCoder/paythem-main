import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from 'containers/Auth';
import MemberLayout from 'containers/Member';

const Layout = ({ isAuth, children, ...rest }) => (
  <>
    {isAuth ? (
      <MemberLayout {...rest}>{children}</MemberLayout>
    ) : (
      <AuthLayout {...rest}>{children}</AuthLayout>
    )}
  </>
);

export const PublicRoute = ({ component: Components, isAuth, ...rest }) => (
  <>
    <Route
      {...rest}
      render={props => (!isAuth ? <Components {...props} /> : <Redirect to="/home" />)}
    />
  </>
);

export const PrivateRoute = ({ component: Components, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuth ? <Components {...props} /> : <Redirect exact to="/login" />)}
  />
);

export default Layout;
