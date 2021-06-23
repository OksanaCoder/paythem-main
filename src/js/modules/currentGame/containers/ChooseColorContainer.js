import React from 'react';
import cx from 'classnames';
import { FormControl, Radio, Popover, Button } from '@material-ui/core';
import { ChromePicker } from 'react-color';

import { ColorIcon } from '../../../../assets/images/icons';
import css from '../../../../styles/pages/currentGame/ChooseColor.scss';

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

const defaultColors = [
  {
    color: 'rgba(78, 145, 217, 1)',
  },
  {
    color: 'rgba(78, 217, 140, 1)',
  },
  {
    color: 'rgba(217, 78, 78, 1)',
  },
  {
    color: 'rgba(217, 132, 78, 1)',
  },
  {
    color: 'rgba(255, 217, 72, 1)',
  },
  {
    color: 'rgba(255, 255, 255, 1)',
  },
];

class ChooseColorContainer extends React.Component {
  constructor(props) {
    super(props);
    const { color } = props;

    this.state = {
      openPopover: false,
      anchorEl: null,
      color,
      customColor: false,
    };
  }

  componentDidMount() {
    this.checkCustomColor();
  }

  checkCustomColor = () => {
    const { color } = this.props;
    if (defaultColors.some(e => e.color === color)) {
      this.setState({
        color,
        customColor: false,
      });
    } else {
      this.setState({
        color: false,
        customColor: color,
      });
    }
  };

  handleChooseColor = e => {
    const { value } = e.currentTarget;
    const { handleEditColor } = this.props;
    this.setState({ color: value, customColor: false });
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
      color: false,
    });
  };

  handleChangeComplete = color => {
    if (color) {
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
            {defaultColors.map(item => (
              <StyledRadio
                key={item.color}
                checked={color === item.color}
                onChange={this.handleChooseColor}
                value={item.color}
                name="color"
              />
            ))}

            <Button
              variant="contained"
              color="primary"
              className={
                customColor
                  ? cx(css.button__top, css.button__customColor, css.button__customColorActive)
                  : cx(css.button__top, css.button__customColor)
              }
              onClick={this.handleOpenPopover}
            >
              <ColorIcon />
            </Button>
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
