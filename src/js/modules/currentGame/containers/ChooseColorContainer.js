import React from 'react';
import { FormControl, Radio, Popover } from '@material-ui/core';
import { ChromePicker } from 'react-color';

import css from 'styles/pages/CurrentGame/ChooseColor.scss';

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

class ChooseColorContainer extends React.Component {
  constructor(props) {
    super(props);
    const { color } = props;

    this.state = {
      openPopover: false,
      anchorEl: null,
      color,
      customColor: '#000',
    };
  }

  handleChooseColor = e => {
    const { value } = e.currentTarget;
    // const { color } = this.state;
    const { handleEditColor } = this.props;
    this.setState({ color: value });
    handleEditColor(value);
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      openPopover: false,
    });
  };

  handleOpenPopover = e => {
    this.setState({
      anchorEl: e.currentTarget,
      openPopover: true,
    });
  };

  handleChangeComplete = color => {
    console.log('color', color.rgb);
    if (color) {
      // const { customColor } = this.state;
      const { handleEditColor } = this.props;
      this.setState({ customColor: color.rgb, color: false });
      handleEditColor(color.rgb);
    }
  };

  render() {
    const { title } = this.props;
    const { color, customColor, openPopover, anchorEl } = this.state;
    const id = openPopover ? 'simple-popover' : undefined;

    return (
      <>
        <FormControl fullWidth className={css.form_input}>
          <h4>{title}</h4>
          <div>
            <StyledRadio
              checked={color === '#4E91D9'}
              onChange={this.handleChooseColor}
              value="#4E91D9"
              name="color"
            />
            <StyledRadio
              checked={color === '#4ED98C'}
              onChange={this.handleChooseColor}
              value="#4ED98C"
              name="color"
            />
            <StyledRadio
              checked={color === '#D94E4E'}
              onChange={this.handleChooseColor}
              value="#D94E4E"
              name="color"
            />
            <StyledRadio
              checked={color === '#D9844E'}
              onChange={this.handleChooseColor}
              value="#D9844E"
              name="color"
            />
            <StyledRadio
              checked={color === '#FFD948'}
              onChange={this.handleChooseColor}
              value="#FFD948"
              name="color"
            />
            <StyledRadio
              checked={color === '#fff'}
              onChange={this.handleChooseColor}
              value="#ffffff"
              name="color"
            />
            <StyledRadio
              checked={color === 'custom'}
              onChange={this.handleOpenPopover}
              value="custom"
              name="color"
            />
          </div>
        </FormControl>

        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <ChromePicker color={customColor} onChangeComplete={this.handleChangeComplete} />
        </Popover>
      </>
    );
  }
}

export default ChooseColorContainer;
