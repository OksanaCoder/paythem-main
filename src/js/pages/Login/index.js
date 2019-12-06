import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import strings from 'translations';
import Input from 'components/Form/Input';
import Formik from 'helpers/Formik';
import { LoginSchema } from 'helpers/Formik/validation';

import css from 'styles/containers/Auth.scss';

const Login = ({ onSubmit, isLoadingAuth }) => (
  <div className={css.auth__content}>
    <h2 className={css.auth__title}>{strings.other.login_account}</h2>
    <h3 className={css.auth__subtitle}>
      Welcome to Playthem service! Please login to start using our service
    </h3>
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <form className={css.auth__form}>
          <Input
            className={css.auth__form_input}
            label={strings.form.email}
            type="email"
            name="email"
            variant="outlined"
            error={errors.email && touched.email}
            errorText={errors.email && touched.email && errors.email}
            value={values.email}
            onChange={handleChange}
          />
          <Input
            className={css.auth__form_input}
            label={strings.form.password}
            type="password"
            name="password"
            variant="outlined"
            error={errors.password && touched.password}
            errorText={errors.password && touched.password && errors.password}
            value={values.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            className={css.auth__button}
            variant="contained"
            disabled={isSubmitting || isLoadingAuth}
            color="primary"
            onClick={handleSubmit}
          >
            <span className={css.auth__button_icon} />
            {strings.buttons.login}
          </Button>
        </form>
      )}
    </Formik>
    <Link to="/register">{strings.other.registration}</Link>

    <Link to="/forgot">{strings.buttons.forgot_password}</Link>
  </div>
);

export default withRouter(Login);
