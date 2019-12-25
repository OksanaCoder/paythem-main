/* eslint-disable camelcase */
import React from 'react';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

class ColorSchemeContainer extends React.Component {
  constructor(props) {
    super(props);
    const { colorSchemeData } = props;
    this.state = {
      bg_window: colorSchemeData.bg_window,
      bg_wheel: colorSchemeData.bg_indicator_button,
      bg_indicator_button: colorSchemeData.bg_indicator_button,
      text_content: colorSchemeData.text_content,
      text_wheel: colorSchemeData.text_wheel,
      text_button: colorSchemeData.text_button,
    };
  }

  handleEditColor = target => value => {
    let color = '';
    if (typeof value === 'object') {
      const { r, g, b, a } = value;
      color = `rgba(${r},${g},${b},${a})`;
    } else {
      color = value;
    }
    const { colorSchemeData } = this.props;
    colorSchemeData[target] = color;
  };

  render() {
    const { handleCloseTabContent, tabValue } = this.props;
    const {
      bg_window,
      bg_wheel,
      bg_indicator_button,
      text_content,
      text_wheel,
      text_button,
    } = this.state;

    return (
      <TabContentComponent
        title="Color Scheme"
        description="Below you can find the customization options of the template colors"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <ChooseColorContainer
          title="Window Background"
          color={bg_window}
          handleEditColor={this.handleEditColor('bg_window')}
        />
        <ChooseColorContainer
          title="Bottom Wheel"
          color={bg_wheel}
          handleEditColor={this.handleEditColor('bg_wheel')}
        />
        <ChooseColorContainer
          title="Indicator & Start Button"
          color={bg_indicator_button}
          handleEditColor={this.handleEditColor('bg_indicator_button')}
        />
        <ChooseColorContainer
          title="Text Content"
          color={text_content}
          handleEditColor={this.handleEditColor('text_content')}
        />
        <ChooseColorContainer
          title="Text Wheel"
          color={text_wheel}
          handleEditColor={this.handleEditColor('text_wheel')}
        />
        <ChooseColorContainer
          title="Text Button"
          color={text_button}
          handleEditColor={this.handleEditColor('text_button')}
        />
      </TabContentComponent>
    );
  }
}

export default ColorSchemeContainer;
