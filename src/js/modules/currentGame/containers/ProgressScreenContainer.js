import React from 'react';
import { FormControl, FormHelperText, OutlinedInput, TextField } from '@material-ui/core';
import Formik from 'helpers/Formik';
import { ProgressScreenSchema } from 'helpers/Formik/validation';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

class ProgressScreenContainer extends React.Component {
  handleSubmitForm = values => {
    console.log(values);

    const data = {
      title: values.title,
      subTitle: values.subTitle,
    };
    console.log('data', data);
    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  render() {
    const { tabValue, progressScreenData } = this.props;

    return (
      <Formik
        initialValues={{
          title: progressScreenData.title,
          subTitle: progressScreenData.subtitle,
        }}
        validationSchema={ProgressScreenSchema}
        onSubmit={this.handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <TabContentComponent
            title="Progress Screen"
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
                    progressScreenData.title = e.target.value;
                  }}
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
                    progressScreenData.subtitle = e.target.value;
                  }}
                  error={errors.subTitle && touched.subTitle}
                  value={values.subTitle}
                />
                {errors.subTitle && touched.subTitle && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.subTitle}
                  </FormHelperText>
                )}
              </FormControl>
            </form>
          </TabContentComponent>
        )}
      </Formik>
    );
  }
}

export default ProgressScreenContainer;