import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LinearProgress, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import css from '../../../styles/containers/Auth.scss';

const styles = {
  linearColorPrimary: {
    backgroundColor: '#f5f5f5',
  },
  linearBarColorPrimary: {
    backgroundColor: '#4e91d9',
  },
};

class Auth extends Component {
  loadingAuth = () => {
    const { sendRegister, sendLogin, sendForgotPassword, sendResetPassword } = this.props;
    return (
      sendRegister.loading ||
      sendLogin.loading ||
      sendForgotPassword.loading ||
      sendResetPassword.loading
    );
  };

  render() {
    const { classes, children } = this.props;
    const isLoadingAuth = this.loadingAuth();

    return (
      <section className='auth'>
        <div className='auth__wrap'>
          <div className='auth__logo' />
          <div className='auth__container'>
            {isLoadingAuth && (
              <LinearProgress
                classes={{
                  colorPrimary: classes.linearColorPrimary,
                  barColorPrimary: classes.linearBarColorPrimary,
                }}
                className={css.auth__progress}
              />
            )}
            {children}
          </div>
          <div className='auth__circle1' />
          <div className='auth__circle2' />
          <div className='auth__circle3' />
          <div className='auth__circle4' />
          <div className='auth__circle5' />
          <div className='auth__circle6' />
          <div className='auth__circle7' />
        </div>
      </section>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      sendRegister: state.post.sendRegister,
      sendLogin: state.post.sendLogin,
      sendForgotPassword: state.post.sendForgotPassword,
      sendResetPassword: state.post.sendResetPassword,
    }),
    null,
  )(withStyles(styles)(Auth)),
);
