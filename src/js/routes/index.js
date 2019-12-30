/* eslint-disable max-len */
import React, { Component, Suspense, lazy } from 'react';
import { HashRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import strings, { langLoad } from 'translations';
import {
  register,
  login,
  isLoggedIn,
  logout,
  forgotPassword,
  resetPassword,
  addNotification,
} from 'actions';

import ErrorBoundary from 'containers/ErrorBoundary';
import Loader from 'components/Loader';
import { setAuthBearerToken } from 'helpers/Authorization';
import STORAGE from 'helpers/storage';
import Layout, { PrivateRoute, PublicRoute } from 'routes/Layout';

const App = lazy(() => import('containers/App'));
const Registration = lazy(() => import('pages/Register'));
const Login = lazy(() => import('pages/Login'));
const ForgotPassword = lazy(() => import('pages/ForgotPassword'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));

const Home = lazy(() => import('pages/Admin/Home'));

class Routes extends Component {
  componentDidMount() {
    langLoad();
    this.isAuthenticatedUser();
  }

  isAuthenticatedUser = () => {
    const {
      isLoggedInAction,
      isAuth: { isAuthenticated },
    } = this.props;
    const token = STORAGE.getItem('token');
    const refreshTokenExpires = token && STORAGE.jwtDecode(token.refresh_token);
    const user = token && STORAGE.jwtDecode(token.access_token);
    const getTime = new Date().getTime() / 1000;

    if (isAuthenticated && token && refreshTokenExpires.exp <= getTime) {
      this.logout();
    }

    if ((isAuthenticated || token) && user !== null && user.userId !== null) {
      setAuthBearerToken(token.access_token);
      isLoggedInAction(user.userId);
    } else this.logout();
  };

  handleLogin = values => {
    const { loginAction, addNotificationAction } = this.props;
    loginAction(values).then(res => {
      if (res.error) {
        addNotificationAction({
          type: 'error',
          text: strings.notifications.error.auth_error_no_data,
        });
      } else this.authResult(res.payload);
    });
  };

  handleRegister = ({ email, password, name }) => {
    const { registerAction, addNotificationAction } = this.props;
    const data = {
      email,
      password,
      name,
    };

    registerAction(data).then(res => {
      if (res.error) {
        addNotificationAction({
          type: 'error',
          text: strings.notifications.error.email_exists,
        });
      } else {
        addNotificationAction({
          type: 'success',
          text: strings.notifications.success.welcome,
        });
        this.authResult(res.payload);
      }
    });
  };

  handleForgotPassword = values => {
    const { forgotPasswordAction, addNotificationAction } = this.props;
    forgotPasswordAction(values).then(res => {
      if (res.error) {
        addNotificationAction({
          type: 'error',
          text: strings.notifications.error.email_not_registered,
        });
      } else {
        addNotificationAction({
          type: 'info',
          text: strings.notifications.info.forgot_password,
        });
      }
    });
  };

  handleResetPassword = ({ res: resToken, password }) => {
    const { resetPasswordAction, addNotificationAction } = this.props;
    resetPasswordAction({ res: resToken, password }).then(res => {
      if (res.error) {
        addNotificationAction({
          type: 'error',
          text: strings.notifications.error.auth_error,
        });
      } else {
        addNotificationAction({
          type: 'info',
          text: strings.notifications.info.password_updated,
        });
        this.authResult(res.payload);
      }
    });
  };

  authResult = payload => {
    const { isLoggedInAction } = this.props;
    if (payload.status >= 200 && payload.status <= 299) {
      const { data } = payload;
      const user = data && STORAGE.jwtDecode(data.access_token);
      setAuthBearerToken(data.access_token);
      isLoggedInAction(user.userId);
      STORAGE.setItem('token', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
    } else this.logout();
  };

  logout = () => {
    const { isLoggedInAction, logoutAction } = this.props;
    STORAGE.removeItem('token');
    STORAGE.removeItem('currentDomainStorage');
    setAuthBearerToken(false);
    isLoggedInAction();
    logoutAction();
  };

  render() {
    const {
      isAuth: { isAuthenticated },
    } = this.props;

    return (
      <HashRouter>
        <Suspense fallback={<Loader isFetching />}>
          <App>
            <Layout isAuth={isAuthenticated} logout={this.logout}>
              <ErrorBoundary>
                <Switch>
                  {/* @PublicRoutes */}
                  <PublicRoute
                    exect
                    path="/login"
                    isAuth={isAuthenticated}
                    component={() => <Login onSubmit={this.handleLogin} />}
                  />
                  <PublicRoute
                    exect
                    path="/register"
                    isAuth={isAuthenticated}
                    component={() => <Registration onSubmit={this.handleRegister} />}
                  />
                  <PublicRoute
                    exect
                    path="/forgot"
                    isAuth={isAuthenticated}
                    component={() => <ForgotPassword onSubmit={this.handleForgotPassword} />}
                  />
                  <PublicRoute
                    exect
                    path="/reset"
                    isAuth={isAuthenticated}
                    component={() => <ResetPassword onSubmit={this.handleResetPassword} />}
                  />

                  {/* @PrivateRoutes */}
                  <PrivateRoute exect path="/home" isAuth={isAuthenticated} component={Home} />

                  <Redirect exect to="/login" />
                </Switch>
              </ErrorBoundary>
            </Layout>
          </App>
        </Suspense>
      </HashRouter>
    );
  }
}

export default connect(
  state => ({
    isAuth: state.get.authentication,
  }),
  dispatch => ({
    registerAction: data => dispatch(register(data)),
    loginAction: data => dispatch(login(data)),
    isLoggedInAction: data => dispatch(isLoggedIn(data)),
    forgotPasswordAction: email => dispatch(forgotPassword(email)),
    resetPasswordAction: data => dispatch(resetPassword(data)),
    logoutAction: () => dispatch(logout()),
    addNotificationAction: data => dispatch(addNotification(data)),
  }),
)(Routes);
