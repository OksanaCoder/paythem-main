import React from 'react';
import { FormControl, FormHelperText, OutlinedInput, TextField } from '@material-ui/core';
import Formik from 'helpers/Formik';
import { ProgressScreenSchema } from 'helpers/Formik/validation';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame/Content.scss';

class FinishScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    const { finishScreenData } = props;

    this.state = {
      finishScreenDataDefault: finishScreenData,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { finishScreenData } = nextProps;
    this.setState({
      finishScreenDataDefault: finishScreenData,
    });
  }

  handleSubmitForm = values => {
    const { finishScreenData, handleCloseTabContent } = this.props;

    const data = {
      title: values.title,
      subtitle: values.subtitle,
      privacy: values.privacy,
    };
    console.log('finishScreenData1', finishScreenData);
    Object.assign(finishScreenData, data);
    console.log('finishScreenData2', finishScreenData);
    handleCloseTabContent();
  };

  render() {
    const { tabValue } = this.props;
    const { finishScreenDataDefault } = this.state;

    return (
      <Formik
        initialValues={{
          title: finishScreenDataDefault.title,
          subtitle: finishScreenDataDefault.subtitle,
          privacy: finishScreenDataDefault.privacy,
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
                  onChange={e => {
                    handleChange(e);
                    finishScreenDataDefault.title = e.target.value;
                  }}
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
                  name="subtitle"
                  placeholder="Please wait few second"
                  multiline
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    finishScreenDataDefault.subtitle = e.target.value;
                  }}
                  error={errors.subtitle && touched.subtitle}
                  value={values.subtitle}
                />
                {errors.subtitle && touched.subtitle && (
                  <FormHelperText className={css.form_inputError}>{errors.subtitle}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Company Logo</h4>
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Disclamer Text</h4>
                <TextField
                  name="privacy"
                  placeholder="In order to use this discount add it to the relevant field in checkout"
                  multiline
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    finishScreenDataDefault.privacy = e.target.value;
                  }}
                  value={values.privacy}
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
