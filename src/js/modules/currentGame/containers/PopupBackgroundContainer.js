import React from 'react';
// import {  } from '@material-ui/core';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

// import css from 'styles/pages/CurrentGame.scss';

class PopupBackgroundContainer extends React.Component {
  handleEditColor = trigger => color => {
    // color format rgba
    console.log('trigger', trigger);
    console.log('COLOR', color);
  };

  render() {
    const { handleCloseTabContent, tabValue } = this.props;
    return (
      <TabContentComponent
        title="Popup Background"
        description="Below you can find the customization options of the background"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <h4>Background image</h4>

        <ChooseColorContainer
          title="Overlay color"
          color="red"
          handleEditColor={this.handleEditColor('overlayColor')}
        />
      </TabContentComponent>
    );
  }
}

export default PopupBackgroundContainer;
