/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import { Dialog, Slide, Button } from '@material-ui/core';

import { CloseIcon } from 'assets/images/icons';

import TabContentCurrentGameComponent from 'modules/currentGame/components/TabContentCurrentGameComponent';

import css from 'styles/pages/CurrentGame.scss';

class PopupBackgroundContainer extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    tabValue: false,
  };

  render() {
    const { handleCloseTabContent, tabValue } = this.props;
    return (
      <TabContentCurrentGameComponent
        title="Popup Background"
        description="Below you can find the customization options of the background"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        Test
      </TabContentCurrentGameComponent>
    );
  }
}

export default PopupBackgroundContainer;
