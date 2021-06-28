/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import strings from '../../translations';
import Input from '../../components/Form/Input';
import SignupSchema from '../../helpers/Formik/validation';
import Formik from '../../helpers/Formik';

import '../../../styles/containers/Auth.scss';

const Register = ({ onSubmit, isLoadingAuth }) => (
  <React.Fragment>
    <div className='auth__content'>
      <h2 className='auth__title'>{strings.other.registration}</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form className='auth__form'>
            <Input
              className='auth__form_input'
              label="Name"
              variant="outlined"
              type="name"
              name="name"
              error={errors.name && touched.name}
              errorText={errors.name && touched.name && errors.name}
              value={values.name}
              onChange={handleChange}
            />
            <Input
              className='auth__form_input'
              label={`${strings.form.email} *`}
              variant="outlined"
              type="email"
              name="email"
              error={errors.email && touched.email}
              errorText={errors.email && touched.email && errors.email}
              value={values.email}
              onChange={handleChange}
            />
            <Input
              className='auth__form_input'
              label={`${strings.form.password} *`}
              variant="outlined"
              type="password"
              name="password"
              error={errors.password && touched.password}
              errorText={errors.password && touched.password && errors.password}
              value={values.password}
              onChange={handleChange}
            />
            <Input
              className='auth__form_input'
              label={`${strings.form.password_confirm} *`}
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
            <p>
              {strings.other.privacy[0]}
              <a className='auth__privicyLink' target="_blank" href="/">
                {strings.other.privacy[1]}
              </a>
            </p>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className='auth__button'
              disabled={isSubmitting || isLoadingAuth}
              onClick={handleSubmit}
            >
              <span className='auth__button_icon' />
              {strings.buttons.register}
            </Button>
          </form>
        )}
      </Formik>

      <Link to="/login">{strings.buttons.login}</Link>
    </div>
  </React.Fragment>
);

export default Register;
