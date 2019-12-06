import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import strings from 'translations';
import Input from 'components/Form/Input';
import Formik from 'helpers/Formik';
import { ForgotPasswordSchema } from 'helpers/Formik/validation';

import css from 'styles/containers/Auth.scss';

const ForgotPassword = ({ onSubmit, isLoadingAuth }) => (
  <div className={css.content}>
    <h2 className={css.auth__title}>{strings.other.recovery}</h2>
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <form className={css.auth__form}>
          <Input
            className={css.auth__form_input}
            label={`${strings.form.email} *`}
            type="email"
            name="email"
            variant="outlined"
            error={errors.email && touched.email}
            errorText={errors.email && touched.email && errors.email}
            value={values.email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={css.auth__button}
            disabled={isSubmitting || isLoadingAuth}
            onClick={handleSubmit}
          >
            <span className={css.auth__button_icon} />
            {strings.buttons.send}
          </Button>
        </form>
      )}
    </Formik>

    <Link to="/login">{strings.buttons.back_login}</Link>
  </div>
);

export default ForgotPassword;
