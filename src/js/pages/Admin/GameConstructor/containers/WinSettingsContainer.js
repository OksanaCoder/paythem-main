/* eslint-disable */

import React from 'react';
import cx from 'classnames';
import { Grid, Button, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// import { connect } from 'react-redux';

import BtnsEditComponent from 'pages/Admin/GameConstructor/components/BtnsEditComponent';
import BtnsScreenViewComponent from 'pages/Admin/GameConstructor/components/BtnsScreenViewComponent';
import TextEditComponent from 'pages/Admin/GameConstructor/components/TextEditComponent';
import ColorEditComponent from 'pages/Admin/GameConstructor/components/ColorEditComponent';

import css from 'styles/pages/GameConstructor/GameAndWinSettings.scss';

class WinSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const { winSettingsData } = props;
    this.state = {
      winSettingsDefault: winSettingsData,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { winSettingsData } = nextProps;
    this.setState({
      winSettingsDefault: winSettingsData,
    });
  }

  handleChangeValue = element => e => {
    const { name, value } = e.target;
    const { winSettingsDefault } = this.state;

    const winSettingsDefaultData = { ...winSettingsDefault };
    winSettingsDefaultData[element][name] = value;
    this.setState({ winSettingsDefault: winSettingsDefaultData });
  };

  handleChangeColor = element => e => {
    console.log(element);
    const { hex } = e;
    const { winSettingsDefault } = this.state;
    const winSettingsDefaultData = { ...winSettingsDefault };

    winSettingsDefaultData[element].color = hex;
    this.setState({ winSettingsDefault: winSettingsDefaultData });
  };

  styles = winSettingsDefault => {
    const { title, sub_title, button } = winSettingsDefault;

    const titleCss = {
      fontFamily: title.family,
      fontSize: `${title.size}px`,
      textAlign: title.align,
      fontWeight: title.weight,
      fontStyle: title.style,
      color: title.color,
    };

    const subTitleCss = {
      fontFamily: sub_title.family,
      fontSize: `${sub_title.size}px`,
      textAlign: sub_title.align,
      fontWeight: sub_title.weight,
      fontStyle: sub_title.style,
      color: sub_title.color,
    };

    const buttonCss = {
      fontFamily: button.family,
      fontSize: `${button.size}px`,
      textAlign: button.align,
      fontWeight: button.weight,
      fontStyle: button.style,
      color: button.color,
    };

    return { titleCss, subTitleCss, buttonCss };
  };

  render() {
    const { handleScreenView, handleGameSettings, active, winSettingsBackground } = this.props;
    const { winSettingsDefault } = this.state;
    const { titleCss, subTitleCss, buttonCss } = this.styles(winSettingsDefault);

    console.log(winSettingsDefault);
    // console.log(this.props.winSettingsDefaultData);

    return (
      <Grid container spacing={3}>
        <Grid item className={css.tab__content}>
          <div className={css.tab__content_headerBtns}>
            <Button
              variant="contained"
              color="primary"
              className={cx(css.button__dark_blue, css.button)}
            >
              Upload color background
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={cx(css.button__dark_blue, css.button)}
            >
              Upload image background
            </Button>
          </div>
          <div className={css.tab__content_header}>
            <h4 className={css.heading_info}>Click any element to edit it</h4>
          </div>
          <div style={{ background: `${winSettingsBackground.color}` }}>
            <div style={{ display: 'flex' }}>
              <h1 style={titleCss}>{winSettingsDefault.title.text}</h1>
              {active === 'editText' ? (
                <TextEditComponent
                  onChangeValue={this.handleChangeValue('title')}
                  settings={winSettingsDefault.title}
                />
              ) : (
                <ColorEditComponent
                  element="title"
                  onChangeValue={this.handleChangeColor('title')}
                  settings={winSettingsDefault.title}
                />
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <h2 style={subTitleCss}>{winSettingsDefault.sub_title.text}</h2>
              {active === 'editText' ? (
                <TextEditComponent
                  element="subtitle"
                  onChangeValue={this.handleChangeValue('sub_title')}
                  settings={winSettingsDefault.sub_title}
                />
              ) : (
                <ColorEditComponent
                  element="subtitle"
                  onChangeValue={this.handleChangeColor('sub_title')}
                  settings={winSettingsDefault.sub_title}
                />
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <Button style={buttonCss}>{winSettingsDefault.button.text}</Button>
              {active === 'editText' ? (
                <TextEditComponent
                  element="button"
                  onChangeValue={this.handleChangeValue('button')}
                  settings={winSettingsDefault.button}
                />
              ) : (
                <ColorEditComponent
                  element="button"
                  onChangeValue={this.handleChangeColor('button')}
                  settings={winSettingsDefault.button}
                />
              )}
            </div>
          </div>
          <div className={css.tab__content_gameSettings}>
            <div className={css.tab__content_gameImg} />

            <Grid container direction="column" justify="center" alignItems="center">
              <p>Preview</p>
              <Button
                variant="contained"
                color="primary"
                className={cx(css.button__blue, css.button)}
              >
                Apply changes
              </Button>
            </Grid>
            <div className={css.tab__content_gameSettingsBtns}>
              <BtnsEditComponent handleGameSettings={handleGameSettings} active={active} />
              <BtnsScreenViewComponent handleScreenView={handleScreenView} />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default WinSettingsContainer;
