import React from 'react';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, OutlinedInput, TextField } from '@material-ui/core';

import { paramsDefault } from 'actions';
import Formik from 'helpers/Formik';
import { ProgressScreenSchema } from 'helpers/Formik/validation';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

class ProgressScreenContainer extends React.Component {
  handleSubmitForm = () => {
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
    params.content.progress[name] = value;
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
          ...content.progress,
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
                    this.handleChangeParams(e);
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
                  name="subtitle"
                  placeholder="One of our awesome gifts already yours! One step more to receive it."
                  multiline
                  variant="outlined"
                  onChange={e => {
                    handleChange(e);
                    this.handleChangeParams(e);
                  }}
                  error={errors.subtitle && touched.subtitle}
                  value={values.subtitle}
                />
                {errors.subtitle && touched.subtitle && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.subtitle}
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

export default connect(
  state => ({
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    paramsDefaultAction: data => dispatch(paramsDefault(data)),
  }),
)(ProgressScreenContainer);
