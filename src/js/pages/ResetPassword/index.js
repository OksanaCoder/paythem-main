import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

import strings from '../../translations';
import Input from '../../components/Form/Input';
import { ResetPasswordSchema } from '../../helpers/Formik/validation';
import Formik from '../../helpers/Formik';
import ParsingUrl from '../../helpers/ParsingUrl';

import css from '../../../styles/containers/Auth.scss';

const ResetPassword = ({ onSubmit }) => {
  const {
    urlParsed: { res },
  } = ParsingUrl(window.location.search);

  return (
    <div className={css.auth__content}>
      <h2 className={css.auth__title}>{strings.other.reset_password}</h2>
      <Formik
        initialValues={{
          res,
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ResetPasswordSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form className={css.auth__form}>
            <Input
              label=""
              variant="outlined"
              type="hidden"
              name="res"
              value={values.res}
              onChange={handleChange}
            />
            <Input
              label={`${strings.form.password_new} *`}
              variant="outlined"
              type="password"
              name="password"
              error={errors.password && touched.password}
              errorText={errors.password && touched.password && errors.password}
              value={values.password}
              onChange={handleChange}
            />
            <Input
              label={`${strings.form.password_new_confirm} *`}
              variant="outlined"
              type="password"
              name="confirmPassword"
              error={errors.confirmPassword && touched.confirmPassword}
              errorText={
                errors.confirmPassword && touched.confirmPassword && errors.confirmPassword
              }
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={css.auth__button}
              disabled={isSubmitting || values.res === ''}
              onClick={handleSubmit}
            >
              {strings.buttons.reset_pass_and_login}
            </Button>
          </form>
        )}
      </Formik>
      <Link to="/login">{strings.buttons.back_login}</Link>
    </div>
  );
};

export default withRouter(ResetPassword);
