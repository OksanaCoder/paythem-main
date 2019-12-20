/* eslint-disable camelcase */
import React from 'react';
import { FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';
import Formik from 'helpers/Formik';
import { TriggerButtonTextSchema } from 'helpers/Formik/validation';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

import css from 'styles/pages/CurrentGame.scss';

class TriggerButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    const { editWidgetData } = props;

    this.state = {
      editWidgetDefault: editWidgetData,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { editWidgetData } = nextProps;
    this.setState({
      editWidgetDefault: editWidgetData,
    });
  }

  handleEditTriggerButton = e => {
    const { editWidgetData } = this.props;
    const { name, value } = e.currentTarget;
    const { editWidgetDefault } = this.state;

    const editWidgetDataUpdated = { ...editWidgetDefault };

    editWidgetDataUpdated[name] = value;

    this.setState(
      {
        editWidgetDefault: editWidgetDataUpdated,
      },
      () => {
        Object.assign(editWidgetData, editWidgetDefault);
      },
    );
  };

  handleEditColor = trigger => color => {
    console.log('COLOR', color);
    const { editWidgetData } = this.props;
    const { editWidgetDefault } = this.state;

    const editWidgetDataUpdated = { ...editWidgetDefault };

    editWidgetDataUpdated[trigger] = color;
    this.setState(
      {
        editWidgetDefault: editWidgetDataUpdated,
      },
      () => {
        Object.assign(editWidgetData, editWidgetDefault);
      },
    );
  };

  handleSubmitTitle = values => {
    const { editWidgetData, handleCloseTabContent } = this.props;
    const { title } = values;
    const { editWidgetDefault } = this.state;

    const editWidgetDataUpdated = { ...editWidgetDefault };

    editWidgetDataUpdated.title = title;

    this.setState(
      {
        editWidgetDefault: editWidgetDataUpdated,
      },
      () => {
        Object.assign(editWidgetData, editWidgetDefault);
      },
    );
    handleCloseTabContent();
  };

  render() {
    const { editWidgetDefault } = this.state;
    const { tabValue, editWidgetData } = this.props;

    return (
      <Formik
        initialValues={{ title: editWidgetDefault.title }}
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
                    editWidgetData.title = e.target.value;
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
                color={editWidgetData.text_color}
                handleEditColor={this.handleEditColor('text_color')}
              />
              <ChooseColorContainer
                title="Background Color"
                color={editWidgetData.bg_color}
                handleEditColor={this.handleEditColor('bg_color')}
              />
            </form>
          </TabContentComponent>
        )}
      </Formik>
    );
  }
}

export default TriggerButtonContainer;
