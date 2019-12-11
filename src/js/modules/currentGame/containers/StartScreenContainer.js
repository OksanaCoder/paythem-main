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
  state = {
    checkedName: false,
    checkedPhone: false,
  };

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmitForm = values => {
    console.log(values);
    const { checkedName, checkedPhone } = this.state;
    const data = {
      title: values.title,
      subTitle: values.subTitle,
      startBtnLabel: values.startBtnLabel,
      checkedName,
      checkedPhone,
    };
    console.log('data', data);
    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  render() {
    const { checkedName, checkedPhone } = this.state;
    const { tabValue } = this.props;

    return (
      <Formik
        initialValues={{
          title: 'Title',
          subTitle: 'Test Subtitle',
          startBtnLabel: 'START',
        }}
        validationSchema={StartScreenSchema}
        onSubmit={this.handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                      checked={checkedName}
                      onChange={this.handleChangeCheckbox('checkedName')}
                      value="checkedName"
                      color="secondary"
                    />
                  }
                  label="Full Name"
                />
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={
                    <Checkbox
                      checked={checkedPhone}
                      onChange={this.handleChangeCheckbox('checkedPhone')}
                      value="checkedPhone"
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
