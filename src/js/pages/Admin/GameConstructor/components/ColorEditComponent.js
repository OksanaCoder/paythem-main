import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';

export default class ColorEditComponent extends Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    const { displayColorPicker } = this.state;
    const { onChangeValue, settings } = this.props;

    const Color = styled(Box)({
      width: '36px',
      height: '14px',
      borderRadius: '2px',
      background: `${settings.color}`,
    });

    const Swatch = styled(Box)({
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    });

    const Popover = styled(Box)({
      position: 'absolute',
      zIndex: '2',
    });
    const Cover = styled(Box)({
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    });

    return (
      <div>
        <Swatch onClick={this.handleClick}>
          <Color />
        </Swatch>
        {displayColorPicker ? (
          <Popover>
            <Cover onClick={this.handleClose} />
            <SketchPicker name="color" color={settings.color} onChange={onChangeValue} />
          </Popover>
        ) : null}
      </div>
    );
  }
}
