import React from 'react';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import Formik from 'helpers/Formik';
import { StartScreenSchema } from 'helpers/Formik/validation';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

class StartScreenContainer extends React.Component {
  handleSubmitForm = values => {
    const { startScreenData, handleCloseTabContent } = this.props;

    console.log(values);
    startScreenData.form[1].checked = values.name;
    startScreenData.form[2].checked = values.phone;

    const data = {
      title: values.title,
      subtitle: values.subTitle,
      button: values.startBtnLabel,
    };

    Object.assign(startScreenData, data);

    console.log('startScreenData', startScreenData);

    handleCloseTabContent();
  };

  render() {
    const { tabValue, startScreenData } = this.props;
    console.log('startScreenData', startScreenData);

    return (
      <Formik
        initialValues={{
          title: startScreenData.title,
          subTitle: startScreenData.subtitle,
          startBtnLabel: startScreenData.button,
          name: startScreenData.form[1].checked,
          phone: startScreenData.form[2].checked,
        }}
        validationSchema={StartScreenSchema}
        onSubmit={this.handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <TabContentComponent
            title="Start Screen"
            description="Here you can edit the content which shoudl be shown on this section"
            tabValue={tabValue}
            handleCloseTabContent={handleSubmit}
          >
            <form>
              <FormControl fullWidth className={css.form_input}>
                <h4>Title</h4>
                <OutlinedInput
                  name="title"
                  placeholder="Get your Christmas present!"
                  onChange={e => {
                    handleChange(e);
                    startScreenData.title = e.target.value;
                  }}
                  onBlur={handleBlur}
                  error={errors.title && touched.title}
                  value={values.title}
                  aria-describedby="error-text"
                />
                {errors.title && touched.title && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.title}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Sub Title</h4>
                <TextField
                  name="subTitle"
                  placeholder="One of our awesome gifts already yours! One step more to receive it."
                  multiline
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    startScreenData.subtitle = e.target.value;
                  }}
                  onBlur={handleBlur}
                  error={errors.subTitle && touched.subTitle}
                  value={values.subTitle}
                />
                {errors.subTitle && touched.subTitle && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.subTitle}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Start Button Label</h4>
                <OutlinedInput
                  name="startBtnLabel"
                  placeholder="START"
                  onChange={e => {
                    handleChange(e);
                    startScreenData.button = e.target.value;
                  }}
                  onBlur={handleBlur}
                  error={errors.startBtnLabel && touched.startBtnLabel}
                  value={values.startBtnLabel}
                  aria-describedby="error-text"
                />
                {errors.startBtnLabel && touched.startBtnLabel && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.startBtnLabel}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Enable Form Inputs</h4>
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={<Checkbox disabled checked color="secondary" />}
                  label="Email Address"
                />
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={
                    <Checkbox
                      checked={values.name}
                      onChange={e => {
                        handleChange(e);
                        startScreenData.form[1].checked = e.target.checked;
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
                        startScreenData.form[2].checked = e.target.checked;
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

export default StartScreenContainer;
