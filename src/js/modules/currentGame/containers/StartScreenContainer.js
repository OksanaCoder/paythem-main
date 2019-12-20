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
  constructor(props) {
    super(props);
    const { startScreenData } = props;

    this.state = {
      name: startScreenData.form[1].checked || false,
      phone: startScreenData.form[2].checked || false,
      formDefault: startScreenData.form,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { startScreenData } = nextProps;
    this.setState({
      formDefault: startScreenData.form,
    });
  }

  handleChangeCheckbox = name => event => {
    const { startScreenData } = this.props;
    const { formDefault } = this.state;

    formDefault.forEach(item => {
      if (item.name === name) {
        // eslint-disable-next-line no-param-reassign
        item.checked = event.target.checked;
      }
    });

    startScreenData.form = formDefault;

    this.setState({
      [name]: event.target.checked,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmitForm = values => {
    const { startScreenData, handleCloseTabContent } = this.props;

    console.log(values);

    const data = {
      title: values.title,
      subtitle: values.subTitle,
      button: values.startBtnLabel,
    };

    Object.assign(startScreenData, data);

    handleCloseTabContent();
  };

  render() {
    const { tabValue, startScreenData } = this.props;
    const { name, phone } = this.state;
    console.log('start');

    return (
      <Formik
        initialValues={{
          title: startScreenData.title,
          subTitle: startScreenData.subtitle,
          startBtnLabel: startScreenData.button,
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
                      checked={name}
                      onChange={this.handleChangeCheckbox('name')}
                      value="name"
                      color="secondary"
                    />
                  }
                  label="Full Name"
                />
                <FormControlLabel
                  classes={{ root: css.form_checkboxLabel }}
                  control={
                    <Checkbox
                      checked={phone}
                      onChange={this.handleChangeCheckbox('phone')}
                      value="phone"
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
