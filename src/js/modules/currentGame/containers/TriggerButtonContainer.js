/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import { FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';
import Formik from 'helpers/Formik';
import { TriggerButtonTextSchema } from 'helpers/Formik/validation';

import TabContentCurrentGameComponent from 'modules/currentGame/components/TabContentCurrentGameComponent';
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

  render() {
    const { editWidgetDefault } = this.state;
    const { handleCloseTabContent, tabValue, editWidgetData } = this.props;

    console.log('editWidgetData', editWidgetData);
    return (
      <TabContentCurrentGameComponent
        title="Trigger Button"
        description="Here you can customize the button which should oprn the popup window."
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <Formik validationSchema={TriggerButtonTextSchema}>
          {({ errors, touched }) => (
            <form>
              <FormControl fullWidth className={css.form_input}>
                <h4>Title</h4>
                <OutlinedInput
                  name="title"
                  placeholder="Get free gift!"
                  onChange={this.handleEditTriggerButton}
                  error={errors.title && touched.title}
                  value={editWidgetDefault.title}
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
                color={editWidgetData.textColor}
                handleEditColor={this.handleEditColor('textColor')}
              />
              <ChooseColorContainer
                title="Background Color"
                color={editWidgetData.backgroundColor}
                handleEditColor={this.handleEditColor('backgroundColor')}
              />
            </form>
          )}
        </Formik>
      </TabContentCurrentGameComponent>
    );
  }
}

export default TriggerButtonContainer;
