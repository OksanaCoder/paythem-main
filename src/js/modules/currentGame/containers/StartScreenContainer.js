/* eslint-disable */

import React from 'react';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { paramsDefault } from 'actions';
import Formik from 'helpers/Formik';
import { StartScreenSchema } from 'helpers/Formik/validation';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

class StartScreenContainer extends React.Component {
  handleSubmitForm = values => {
    console.log('values', values);
    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  handleChangeParams = e => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const { name, value } = e.target;
    const params = { ...data };
    params.content.start[name] = value;
    paramsDefaultAction(params);
  };

  handleChangeParamsForm = e => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const { name, checked } = e.target;
    const params = { ...data };
    const index = params.content.start.form.findIndex(item => item.name === name);
    params.content.start.form[index].checked = checked;
    paramsDefaultAction(params);
  };

  render() {
    const {
      tabValue,
      getParamsDefault: {
        data: { content },
      },
    } = this.props;

    return (
      <Formik
        initialValues={{
          title: content.start.title,
          subtitle: content.start.subtitle,
          button: content.start.button,
          name: content.start.form[1].checked,
          phone: content.start.form[2].checked,
        }}
        validationSchema={StartScreenSchema}
        onSubmit={values => this.handleSubmitForm(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <TabContentComponent
            title="Start Screen"
            description="Here you can edit the content which shoudl be shown on this section"
            tabValue={tabValue}
            handleCloseTabContent={() => this.handleSubmitForm()}
          >
            <form>
              <FormControl fullWidth className={css.form_input}>
                <h4>Title</h4>
                <OutlinedInput
                  name="title"
                  placeholder="Get your Christmas present!"
                  onChange={e => {
                    handleChange(e);
                    this.handleChangeParams(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.title && touched.title}
                  value={values.title}
                  aria-describedby="error-title"
                />
                {errors.title && touched.title && (
                  <FormHelperText className={css.form_inputError} id="error-title">
                    {errors.title}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Sub Title</h4>
                <TextField
                  name="subtitle"
                  placeholder="One of our awesome gifts already yours! One step more to receive it."
                  multiline
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    this.handleChangeParams(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.subtitle && touched.subtitle}
                  value={values.subtitle}
                  aria-describedby="error-subtitle"
                />
                {errors.subtitle && touched.subtitle && (
                  <FormHelperText className={css.form_inputError} id="error-subtitle">
                    {errors.subtitle}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Start Button Label</h4>
                <OutlinedInput
                  name="button"
                  placeholder="START"
                  onChange={e => {
                    handleChange(e);
                    this.handleChangeParams(e);
                  }}
                  onBlur={handleBlur}
                  error={errors.button && touched.button}
                  value={values.button}
                  aria-describedby="error-button"
                />
                {errors.button && touched.button && (
                  <FormHelperText className={css.form_inputError} id="error-button">
                    {errors.button}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Enable Form Inputs</h4>
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={<Checkbox disabled checked color="secondary" name="email" />}
                  label="Email Address"
                />
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={
                    <Checkbox
                      checked={values.name}
                      onChange={e => {
                        handleChange(e);
                        this.handleChangeParamsForm(e);
                      }}
                      value={values.name}
                      name="name"
                      color="secondary"
                    />
                  }
                  label="Full Name"
                />
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={
                    <Checkbox
                      checked={values.phone}
                      onChange={e => {
                        handleChange(e);
                        this.handleChangeParamsForm(e);
                      }}
                      value={values.phone}
                      name="phone"
                      color="secondary"
                    />
                  }
                  label="Phone Number"
                />
              </FormControl>
            </form>
          </TabContentComponent>
        )}
      </Formik>
    );
  }
}

export default connect(
  state => ({
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    paramsDefaultAction: data => dispatch(paramsDefault(data)),
  }),
)(StartScreenContainer);
