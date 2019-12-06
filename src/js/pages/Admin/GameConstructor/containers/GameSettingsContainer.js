/* eslint-disable camelcase */
import React from 'react';
import cx from 'classnames';
import { Grid, Button } from '@material-ui/core';
// import { connect } from 'react-redux';

import BtnsEditComponent from 'pages/Admin/GameConstructor/components/BtnsEditComponent';
import BtnsScreenViewComponent from 'pages/Admin/GameConstructor/components/BtnsScreenViewComponent';
import TextEditComponent from 'pages/Admin/GameConstructor/components/TextEditComponent';
import ColorEditComponent from 'pages/Admin/GameConstructor/components/ColorEditComponent';

import css from 'styles/pages/GameConstructor/GameAndWinSettings.scss';

class GameSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const { gameSettingsData } = props;
    this.state = {
      gameSettingsDefault: gameSettingsData,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { gameSettingsData } = nextProps;
    this.setState({
      gameSettingsDefault: gameSettingsData,
    });
  }

  handleChangeValue = element => e => {
    const { name, value } = e.target;
    const { gameSettingsDefault } = this.state;

    const gameSettingsDefaultData = { ...gameSettingsDefault };
    gameSettingsDefaultData[element][name] = value;
    this.setState({ gameSettingsDefault: gameSettingsDefaultData });
  };

  handleChangeColor = element => e => {
    const { hex } = e;
    const { gameSettingsDefault } = this.state;
    const gameSettingsDefaultData = { ...gameSettingsDefault };

    gameSettingsDefaultData[element].color = hex;
    this.setState({ gameSettingsDefault: gameSettingsDefaultData });
  };

  styles = gameSettingsDefault => {
    const {
      title,
      sub_title,
      button,
      bg_header,
      input,
      input_border,
      input_text,
      button_bg,
    } = gameSettingsDefault;

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

    const headerCss = {
      background: bg_header.color,
    };
    const buttonCss = {
      fontFamily: button.family,
      fontSize: `${button.size}px`,
      textAlign: button.align,
      fontWeight: button.weight,
      fontStyle: button.style,
      color: button.color,
      backgroundColor: button_bg.color,
    };
    const inputCss = {
      backgroundColor: input.color,
      borderColor: input_border.color,
      height: '50px',
      marginTop: '20px',
      color: input_text.color,
    };

    return { titleCss, subTitleCss, buttonCss, headerCss, inputCss };
  };

  render() {
    const { handleScreenView, handleGameSettings, active } = this.props;
    const { gameSettingsDefault } = this.state;
    const { titleCss, subTitleCss, buttonCss, headerCss, inputCss } = this.styles(
      gameSettingsDefault,
    );
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
          <div style={headerCss}>
            {active === 'editText' ? (
              <></>
            ) : (
              <ColorEditComponent
                settings={gameSettingsDefault.bg_header}
                onChangeValue={this.handleChangeColor('bg_header')}
              />
            )}
            <div>
              <h1 style={titleCss}>{gameSettingsDefault.title.text}</h1>
              {active === 'editText' ? (
                <TextEditComponent
                  onChangeValue={this.handleChangeValue('title')}
                  settings={gameSettingsDefault.title}
                />
              ) : (
                <ColorEditComponent
                  onChangeValue={this.handleChangeColor('title')}
                  settings={gameSettingsDefault.title}
                />
              )}
            </div>
            <div>
              <h2 style={subTitleCss}>{gameSettingsDefault.sub_title.text}</h2>
              {active === 'editText' ? (
                <TextEditComponent
                  onChangeValue={this.handleChangeValue('sub_title')}
                  settings={gameSettingsDefault.sub_title}
                />
              ) : (
                <ColorEditComponent
                  onChangeValue={this.handleChangeColor('sub_title')}
                  settings={gameSettingsDefault.sub_title}
                />
              )}
            </div>
            <div>
              <Button style={buttonCss}>{gameSettingsDefault.button.text}</Button>
              {active === 'editText' ? (
                <TextEditComponent
                  element="button"
                  onChangeValue={this.handleChangeValue('button')}
                  settings={gameSettingsDefault.button}
                />
              ) : (
                <span style={{ fontSize: '25px' }}>
                  Edit button Background:
                  <ColorEditComponent
                    onChangeValue={this.handleChangeColor('button_bg')}
                    settings={gameSettingsDefault.button_bg}
                  />
                  Edit button text:
                  <ColorEditComponent
                    onChangeValue={this.handleChangeColor('button')}
                    settings={gameSettingsDefault.button}
                  />
                </span>
              )}
              <div>
                <input style={inputCss} type="email" placeholder="Enter email" />
                {active === 'editText' ? (
                  <></>
                ) : (
                  <span style={{ fontSize: '25px' }}>
                    Edit Background:
                    <ColorEditComponent
                      onChangeValue={this.handleChangeColor('input')}
                      settings={gameSettingsDefault.input}
                    />
                    Edit Border:
                    <ColorEditComponent
                      onChangeValue={this.handleChangeColor('input_border')}
                      settings={gameSettingsDefault.input_border}
                    />
                    Edit Text Color:
                    <ColorEditComponent
                      onChangeValue={this.handleChangeColor('input_text')}
                      settings={gameSettingsDefault.input_text}
                    />
                  </span>
                )}
              </div>
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

export default GameSettingsContainer;
