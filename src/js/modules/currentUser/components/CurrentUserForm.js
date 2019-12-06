import React from 'react';
import { Button, OutlinedInput, FormControl, FormHelperText } from '@material-ui/core';

import Formik from 'helpers/Formik';
import { CurrentUserProfileSchema, CurrentUserPassRecoverySchema } from 'helpers/Formik/validation';

import { CloseIcon, AddWebsiteIcon } from 'assets/images/icons';
import css from 'styles/pages/CurrentUser.scss';

const CurrentUserForm = ({ isPasswordRecovery, data, handleSubmitUser, handleClose }) => (
  <React.Fragment>
    <Formik
      initialValues={{
        email: (data && data.email) || '',
        name: (data && data.name) || '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={
        isPasswordRecovery ? CurrentUserPassRecoverySchema : CurrentUserProfileSchema
      }
      onSubmit={handleSubmitUser}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <form className={css.form}>
          {!isPasswordRecovery && (
            <React.Fragment>
              <FormControl fullWidth className={css.form_input}>
                <h4>Account Email</h4>
                <OutlinedInput
                  type="email"
                  name="email"
                  error={errors.email && touched.email}
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className={css.form_input}>
                <h4>User Name</h4>
                <OutlinedInput
                  variant="outlined"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </FormControl>
            </React.Fragment>
          )}

          {isPasswordRecovery && (
            <React.Fragment>
              <FormControl fullWidth className={css.form_input}>
                <h4>Password</h4>
                <OutlinedInput
                  variant="outlined"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password && touched.password}
                />
                {errors.password && touched.password && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.password}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Confirm Password</h4>
                <OutlinedInput
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  value={values.password}
                  onChange={handleChange}
                  error={errors.confirmPassword && touched.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>
            </React.Fragment>
          )}

          <Button
            variant="contained"
            color="primary"
            className={css.button__blue}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            <AddWebsiteIcon />
            Save changes
          </Button>

          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            className={css.button__top}
          >
            <CloseIcon />
            Discard
          </Button>
        </form>
      )}
    </Formik>
  </React.Fragment>
);

export default CurrentUserForm;
