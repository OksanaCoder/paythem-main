/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';

import { paramsDefault } from '../../../actions';
import TabContentComponent from '../components/TabContentComponent';
import ChooseColorContainer from './ChooseColorContainer';

class ColorSchemeContainer extends React.Component {
  handleEditColor = target => value => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;

    let color = '';
    if (typeof value === 'object') {
      const { r, g, b, a } = value;
      color = `rgba(${r},${g},${b},${a})`;
    } else {
      color = value;
    }

    const params = { ...data };
    params.game_style.color_scheme[target] = color;
    paramsDefaultAction(params);
  };

  render() {
    const { handleCloseTabContent, tabValue, getParamsDefault } = this.props;
    const {
      bg_window,
      bg_wheel,
      bg_indicator_button,
      text_content,
      text_wheel,
      text_button,
    } = getParamsDefault.data.game_style.color_scheme;

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

export default connect(
  state => ({
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    paramsDefaultAction: data => dispatch(paramsDefault(data)),
  }),
)(ColorSchemeContainer);
