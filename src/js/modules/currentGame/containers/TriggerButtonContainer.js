/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';

import { paramsDefault } from 'actions';
import Formik from 'helpers/Formik';
import { TriggerButtonTextSchema } from 'helpers/Formik/validation';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

import css from 'styles/pages/CurrentGame.scss';

class TriggerButtonContainer extends React.Component {
  handleChangeParams = e => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const { name, value } = e.target;
    const params = { ...getParamsDefault.data };
    params.behavior.trigger_button[name] = value;
    paramsDefaultAction(params);
  };

  handleEditColor = trigger => color => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const params = { ...getParamsDefault.data };
    params.behavior.trigger_button[trigger] = color;
    paramsDefaultAction(params);
  };

  handleSubmitTitle = () => {
    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  render() {
    const { tabValue, getParamsDefault } = this.props;
    const { trigger_button: triggerButton } = getParamsDefault.data.behavior;

    return (
      <Formik
        initialValues={{
          title: triggerButton.title,
        }}
        validationSchema={TriggerButtonTextSchema}
        onSubmit={this.handleSubmitTitle}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <TabContentComponent
            title="Trigger Button"
            description="Here you can customize the button which should open the popup window."
            tabValue={tabValue}
            handleCloseTabContent={handleSubmit}
          >
            <form>
              <FormControl fullWidth className={css.form_input}>
                <h4>Title</h4>
                <OutlinedInput
                  name="title"
                  placeholder="Get free gift!"
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

              <ChooseColorContainer
                title="Text Color"
                color={triggerButton.text_color}
                handleEditColor={this.handleEditColor('text_color')}
              />
              <ChooseColorContainer
                title="Background Color"
                color={triggerButton.bg_color}
                handleEditColor={this.handleEditColor('bg_color')}
              />
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
)(TriggerButtonContainer);
