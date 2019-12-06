/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import { FormControl, OutlinedInput, FormHelperText } from '@material-ui/core';

import Formik from 'helpers/Formik';
import { TriggerButtonTextSchema } from 'helpers/Formik/validation';

import { CloseIcon } from 'assets/images/icons';

import TabContentCurrentGameComponent from 'modules/currentGame/components/TabContentCurrentGameComponent';

import css from 'styles/pages/CurrentGame.scss';

class TriggerButtonContainer extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    tabValue: false,
  };

  handleEditTitle = values => {
    console.log('values', values);
    const { editWidgetData } = this.props;

    const editWidgetDataUpdated = { ...editWidgetData };
    editWidgetDataUpdated.title = values.title;

    Object.assign(editWidgetData, editWidgetDataUpdated);
  };

  render() {
    const { handleCloseTabContent, tabValue, editWidgetData } = this.props;
    console.log('editWidgetData', editWidgetData);
    return (
      <TabContentCurrentGameComponent
        title="Trigger Button"
        description="Here you can customize the button which should oprn the popup window."
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <Formik
          initialValues={{
            title: editWidgetData.title,
          }}
          validationSchema={TriggerButtonTextSchema}
          onSubmit={this.handleEditTitle}
          //  onChange={this.handleEditTitle}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth className={css.form_input}>
                <h4>Title</h4>
                <OutlinedInput
                  name="title"
                  placeholder="Get free gift!"
                  onChange={handleChange}
                  error={errors.title && touched.title}
                  value={values.title}
                  aria-describedby="error-text"
                />
                {errors.domain && touched.domain && (
                  <FormHelperText className={css.form_inputError} id="error-text">
                    {errors.title}
                  </FormHelperText>
                )}
              </FormControl>
            </form>
          )}
        </Formik>
      </TabContentCurrentGameComponent>
    );
  }
}

export default TriggerButtonContainer;
