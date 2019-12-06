import React from 'react';
import cx from 'classnames';
import {
  Button,
  Dialog,
  OutlinedInput,
  FormControl,
  InputAdornment,
  FormHelperText,
} from '@material-ui/core';

import Formik from 'helpers/Formik';
import { CreateDomainSchema } from 'helpers/Formik/validation';

import { AddWebsiteIcon, CloseIcon } from 'assets/images/icons';

import css from 'styles/components/Dialog.scss';

const addWebsiteDialogComponent = ({
  openWebsiteDialog,
  handleClose,
  handleSubmitWebsite,
  target,
  domainData,
  domains,
}) => (
  <Dialog open={openWebsiteDialog} onClose={handleClose}>
    <Formik
      initialValues={{
        // name: '',
        id: domainData ? domainData._id : '',
        domain: domainData ? domainData.domain : '',
      }}
      validate={values => CreateDomainSchema(values, domains)}
      onSubmit={handleSubmitWebsite}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <form className={css.addWebsite__form}>
          <div className={css.addWebsite__form_title}>
            {target === 'dialogAddWebsite' ? <h3>Add New Website</h3> : <h3>Update Website</h3>}
          </div>
          <div className={css.addWebsite__form_content}>
            {/* <FormControl fullWidth className={css.form_input}>
              <h4>Website title</h4>
              <OutlinedInput
                name="name"
                placeholder="eg. My First Website"
                onChange={handleChange}
                value={values.name}
              />
            </FormControl> */}
            <FormControl fullWidth className={css.form_input}>
              <h4>Destination url</h4>
              <OutlinedInput
                name="domain"
                placeholder="eg. google.com"
                onChange={handleChange}
                error={errors.domain && touched.domain}
                value={values.domain}
                startAdornment={<InputAdornment position="start">http://</InputAdornment>}
                aria-describedby="error-text"
              />
              {errors.domain && touched.domain && (
                <FormHelperText className={css.form_inputError} id="error-text">
                  {errors.domain}
                </FormHelperText>
              )}
            </FormControl>
            <h5>
              Note: you need to enter the full path of the page where you want to place the game.
            </h5>

            <Button
              variant="contained"
              color="primary"
              className={cx(css.button__blue)}
              disabled={isSubmitting}
              onClick={handleSubmit}
              type="submit"
            >
              <AddWebsiteIcon />
              {target === 'dialogAddWebsite' ? 'Add Website' : 'Save'}
            </Button>

            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              className={cx(css.button__top)}
            >
              <CloseIcon />
              Discard
            </Button>
          </div>
        </form>
      )}
    </Formik>
  </Dialog>
);

export default addWebsiteDialogComponent;
