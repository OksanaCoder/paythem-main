import React from 'react';
import { FormControl, FormHelperText, OutlinedInput, TextField } from '@material-ui/core';
import Formik from 'helpers/Formik';
import { ProgressScreenSchema } from 'helpers/Formik/validation';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

class FinishScreenContainer extends React.Component {
  handleSubmitForm = values => {
    console.log(values);

    const data = {
      title: values.title,
      subTitle: values.subTitle,
      disclamerText: values.disclamerText,
    };
    console.log('data', data);
    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  render() {
    const { tabValue } = this.props;

    return (
      <Formik
        initialValues={{
          title: 'Title',
          subTitle: 'Test Subtitle',
          disclamerText: 'In order to use this discount add it to the relevant field in checkout',
        }}
        validationSchema={ProgressScreenSchema}
        onSubmit={this.handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <TabContentComponent
            title="Finish Screen"
            description="Here you can edit the content which should be shown on this section"
            tabValue={tabValue}
            handleCloseTabContent={handleSubmit}
          >
            <form>
              <FormControl fullWidth className={css.form_input}>
                <h4>Title</h4>
                <OutlinedInput
                  name="title"
                  placeholder="Almost there! And you got…"
                  onChange={handleChange}
                  error={errors.title && touched.title}
                  value={values.title}
                  aria-describedby="error-text"
                />
                {errors.title && touched.title && (
                  <FormHelperText className={css.form_inputError}>{errors.title}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Sub Title</h4>
                <TextField
                  name="subTitle"
                  placeholder="Please wait few second"
                  multiline
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.subTitle && touched.subTitle}
                  value={values.subTitle}
                />
                {errors.subTitle && touched.subTitle && (
                  <FormHelperText className={css.form_inputError}>{errors.subTitle}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Company Logo</h4>
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Disclamer Text</h4>
                <TextField
                  name="disclamerText"
                  placeholder="In order to use this discount add it to the relevant field in checkout"
                  multiline
                  variant="outlined"
                  onChange={handleChange}
                  value={values.disclamerText}
                />
              </FormControl>
            </form>
          </TabContentComponent>
        )}
      </Formik>
    );
  }
}

export default FinishScreenContainer;
