/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import { FormControl, RadioGroup, Radio, Popover } from '@material-ui/core';
import { SketchPicker } from 'react-color';

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

class ChooseColorContainer extends React.Component {
  constructor(props) {
    super(props);
    const { color } = props;

    this.state = {
      openPopover: false,
      anchorEl: null,
      color,
      customColor: 'pink',
    };
  }

  handleChooseColor = e => {
    const { value } = e.currentTarget;
    const { handleEditColor } = this.props;
    this.setState({ color: value }, () => handleEditColor(this.state.color));
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
    if (color) {
      const { handleEditColor } = this.props;
      this.setState({ customColor: color.hex, color: false }, () =>
        handleEditColor(this.state.customColor),
      );
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
              checked={color === 'blue'}
              onChange={this.handleChooseColor}
              value="blue"
              name="color"
            />
            <StyledRadio
              checked={color === 'green'}
              onChange={this.handleChooseColor}
              value="green"
              name="color"
            />
            <StyledRadio
              checked={color === 'red'}
              onChange={this.handleChooseColor}
              value="red"
              name="color"
            />
            <StyledRadio
              checked={color === 'orange'}
              onChange={this.handleChooseColor}
              value="orange"
              name="color"
            />
            <StyledRadio
              checked={color === 'yellow'}
              onChange={this.handleChooseColor}
              value="yellow"
              name="color"
            />
            <StyledRadio
              checked={color === 'white'}
              onChange={this.handleChooseColor}
              value="white"
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
          <SketchPicker color={customColor} onChangeComplete={this.handleChangeComplete} />
        </Popover>
      </>
    );
  }
}

export default ChooseColorContainer;
