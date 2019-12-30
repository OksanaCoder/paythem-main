import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, OutlinedInput, TextField, Button } from '@material-ui/core';

import { paramsDefault } from 'actions';
import Formik from 'helpers/Formik';
import { ProgressScreenSchema } from 'helpers/Formik/validation';
import { TrashIcon } from 'assets/images/icons';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame/Content.scss';

class FinishScreenContainer extends React.Component {
  state = {
    bigSize: false,
  };

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
    console.log('name', name);
    console.log('value', value);
    const params = { ...data };
    params.content.finish[name] = value;
    paramsDefaultAction(params);
  };

  handleChangeImage = e => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size < 900000) {
      // eslint-disable-next-line no-unused-vars
      reader.onload = upload => {
        const params = { ...data };
        params.content.finish.company_logo = upload.target.result;
        paramsDefaultAction(params);
        this.setState({
          bigSize: false,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        bigSize: true,
      });
    }
  };

  handleDeleteImage = () => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const params = { ...data };
    params.content.finish.company_logo = '';
    paramsDefaultAction(params);
    this.setState({
      bigSize: false,
    });
  };

  render() {
    const {
      tabValue,
      getParamsDefault: {
        data: { content },
      },
    } = this.props;
    const { bigSize } = this.state;

    return (
      <Formik
        initialValues={{
          ...content.finish,
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
                    this.handleChangeParams(e);
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
                    this.handleChangeParams(e);
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
                <div className={css.currentGame__imageBlock}>
                  {content.finish.company_logo ? (
                    <>
                      <img src={content.finish.company_logo} alt="Background" />
                      <Button
                        variant="contained"
                        color="primary"
                        className={cx(css.button__top)}
                        onClick={this.handleDeleteImage}
                      >
                        <TrashIcon />
                        Delete
                      </Button>
                    </>
                  ) : (
                    <input
                      type="file"
                      name="file"
                      className="upload-file"
                      id="file"
                      onChange={this.handleChangeImage}
                      encType="multipart/form-data"
                    />
                  )}
                </div>
                {bigSize && <p className={css.form_inputError}>Image size has to be max 9Mb</p>}
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
                    this.handleChangeParams(e);
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

export default connect(
  state => ({
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    paramsDefaultAction: data => dispatch(paramsDefault(data)),
  }),
)(FinishScreenContainer);
