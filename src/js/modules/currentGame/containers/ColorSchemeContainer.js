import React from 'react';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

class ColorSchemeContainer extends React.Component {
  handleEditColor = trigger => color => {
    // color format rgba
    console.log('trigger', trigger);
    console.log('COLOR', color);
  };

  render() {
    const { handleCloseTabContent, tabValue } = this.props;
    return (
      <TabContentComponent
        title="Color Scheme"
        description="Below you can find the customization options of the template colors"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <ChooseColorContainer
          title="Window Background"
          color="red"
          handleEditColor={this.handleEditColor('windowBackground')}
        />
        <ChooseColorContainer
          title="Bottom Wheel"
          color="red"
          handleEditColor={this.handleEditColor('bottomWheel')}
        />
        <ChooseColorContainer
          title="Indicator & Start Button"
          color="red"
          handleEditColor={this.handleEditColor('indicatorStartBtn')}
        />
        <ChooseColorContainer
          title="Text Content"
          color="red"
          handleEditColor={this.handleEditColor('textContent')}
        />
      </TabContentComponent>
    );
  }
}

export default ColorSchemeContainer;
