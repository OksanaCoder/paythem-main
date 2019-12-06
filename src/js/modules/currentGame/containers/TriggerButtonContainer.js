/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import {
  FormControl,
  FormControlLabel,
  OutlinedInput,
  FormHelperText,
  RadioGroup,
  makeStyles,
  Radio,
} from '@material-ui/core';

import Formik from 'helpers/Formik';
import { TriggerButtonTextSchema } from 'helpers/Formik/validation';

import TabContentCurrentGameComponent from 'modules/currentGame/components/TabContentCurrentGameComponent';

import css from 'styles/pages/CurrentGame.scss';

// Inspired by blueprintjs
function StyledRadio(props) {
  return (
    <Radio
      classes={{
        root: css.radio_root,
        icon: css.radio_icon,
      }}
      disableRipple
      color="default"
      {...props}
    />
  );
}

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
        <Formik validationSchema={TriggerButtonTextSchema} onSubmit={this.handleEditTitle}>
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
              <FormControl fullWidth className={css.form_input}>
                <h4>Text Color</h4>
                <RadioGroup
                  classes={{
                    root: css.radioGroup_root,
                  }}
                  defaultValue="text-color"
                  name="customized-radios"
                >
                  <StyledRadio value="blue" />
                  <StyledRadio value="green" />
                  <StyledRadio value="red" />
                  <StyledRadio value="orange" />
                  <StyledRadio value="yellow" />
                  <StyledRadio value="white" />
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth className={css.form_input}>
                <h4>Background Color</h4>
                <RadioGroup
                  classes={{
                    root: css.radioGroup_root,
                  }}
                  defaultValue="text-color"
                  name="customized-radios"
                >
                  <StyledRadio value="blue" />
                  <StyledRadio value="green" />
                  <StyledRadio value="red" />
                  <StyledRadio value="orange" />
                  <StyledRadio value="yellow" />
                  <StyledRadio value="white" />
                </RadioGroup>
              </FormControl>
            </form>
          )}
        </Formik>
      </TabContentCurrentGameComponent>
    );
  }
}

export default TriggerButtonContainer;
