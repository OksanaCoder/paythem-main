/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
// import cx from 'classnames';
import { Dialog, Slide } from '@material-ui/core';

import {
  createGame,
  gameSettings,
  screenView,
  addNotification,
  updateParams,
  getGameList,
} from 'actions';

import { PARAMS_DEFAULT } from 'config';

import HeaderCurrentGameComponent from 'modules/currentGame/components/HeaderCurrentGameComponent';
import TabsListComponent from 'modules/currentGame/components/TabsListComponent';
import PopupBackgroundContainer from 'modules/currentGame/containers/PopupBackgroundContainer';
import TriggerButtonContainer from 'modules/currentGame/containers/TriggerButtonContainer';
import CouponsOptionsContainer from 'modules/currentGame/containers/CouponsOptionsContainer';
import ColorSchemeContainer from 'modules/currentGame/containers/ColorSchemeContainer';
import StartScreenContainer from 'modules/currentGame/containers/StartScreenContainer';
import ProgressScreenContainer from 'modules/currentGame/containers/ProgressScreenContainer';
import FinishScreenContainer from 'modules/currentGame/containers/FinishScreenContainer';
import PrimaryIconContainer from 'modules/currentGame/containers/PrimaryIconContainer';
import GeneralSettingsContainer from 'modules/currentGame/containers/GeneralSettingsContainer';

import presentIcon from 'assets/images/icons/present-icon.svg';

import css from 'styles/pages/CurrentGame.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: {
        tabs1: false,
        tabs2: false,
        tabs3: false,
      },
      paramsGlobal: PARAMS_DEFAULT,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      paramsData: { loaded, data },
    } = nextProps;
    const params = loaded && data.data.data.params;
    if (loaded) {
      this.setState({
        paramsGlobal: params,
      });
    }
  }

  updateGameParamsByDomainAndGameId = () => {
    const { updateParamsAction, gameSelected, domainSelected } = this.props;
    const domainId = domainSelected.data._id;
    const gameId = gameSelected.data._id;
    const { paramsGlobal } = this.state;
    const params = { domainId, gameId };
    const data = { params: paramsGlobal };
    const notice = {
      success: 'Game updated',
      error: 'Game update error',
    };
    updateParamsAction(params, data).then(res => this.results(res, notice, false));
  };

  results = (res, notice, isCreated) => {
    const { addNotificationAction } = this.props;
    if (res.error) {
      addNotificationAction({
        type: 'error',
        text: notice.error,
      });
      return false;
    }

    if (isCreated) {
      this.setState({ paramsGlobal: PARAMS_DEFAULT });
    } else {
      // this.loadParamsByDomainAndGameIds();
    }

    addNotificationAction({
      type: 'success',
      text: notice.success,
    });
    return false;
  };

  addGameByDomainId = () => {
    const { createGameAction, gameSelected, domainSelected } = this.props;
    const { paramsGlobal } = this.state;

    const params = { domainId: domainSelected.data._id };
    const data = { game: gameSelected.data.name, params: paramsGlobal };

    const notice = {
      success: 'Game created',
      error: 'Game error',
    };
    createGameAction(params, data).then(res => this.results(res, notice, true));
  };

  handleSubmit = () => {
    const { handleClose, getGameListAction, gameSelected, domainSelected } = this.props;
    const domainId = domainSelected.data._id;
    const gameId = gameSelected.data._id;

    if (domainId && gameId) {
      this.updateGameParamsByDomainAndGameId();
    } else {
      this.addGameByDomainId();
      const params = { domainId };
      getGameListAction(params);
    }
    // Close fullscreen dialog
    handleClose();
    this.handleCloseTabContent();
  };

  handleChangeTabsIntegration = target => (e, value) => {
    const { tabValue } = this.state;
    this.setState({
      tabValue: {
        ...tabValue,
        [target]: value,
      },
    });
  };

  handleCloseTabContent = () => {
    this.setState({
      tabValue: {
        tabs1: false,
        tabs2: false,
        tabs3: false,
      },
    });
  };

  render() {
    const { openGameFullscreenDialog, handleClose, gameSelected, domainSelected } = this.props;
    const { tabValue, paramsGlobal } = this.state;

    return (
      <Dialog
        fullScreen
        open={openGameFullscreenDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <HeaderCurrentGameComponent handleClose={handleClose} handleSubmit={this.handleSubmit} />

        <div className={css.currentGame__content}>
          <div className={css.currentGame__content_inner}>
            <div className={css.currentGame__content_leftMenu}>
              <h3>Customizations</h3>
              <p>Here you can customize the appereance and data of your popup on this section.</p>

              <TabsListComponent
                tabValue={tabValue}
                handleChangeTabsIntegration={this.handleChangeTabsIntegration}
              />

              {tabValue.tabs1 === 'tabGame1' && (
                <PopupBackgroundContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabGame1"
                  popupData={paramsGlobal.game_style.popup_bg}
                />
              )}

              {tabValue.tabs1 === 'tabGame2' && (
                <ColorSchemeContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabGame2"
                />
              )}

              {tabValue.tabs1 === 'tabGame3' && (
                <PrimaryIconContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabGame3"
                  // primaryIconsData={}
                />
              )}

              {tabValue.tabs2 === 'tabContent1' && (
                <StartScreenContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabContent1"
                  startScreenData={paramsGlobal.content.start}
                />
              )}

              {tabValue.tabs2 === 'tabContent2' && (
                <ProgressScreenContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabContent2"
                  progressScreenData={paramsGlobal.content.progress}
                />
              )}

              {tabValue.tabs2 === 'tabContent3' && (
                <FinishScreenContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabContent3"
                  finishScreenData={paramsGlobal.content.finish}
                />
              )}

              {tabValue.tabs3 === 'tabBehaviour1' && (
                <TriggerButtonContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabBehaviour1"
                  editWidgetData={paramsGlobal.behavior.trigger_button}
                />
              )}

              {tabValue.tabs3 === 'tabBehaviour2' && (
                <CouponsOptionsContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabBehaviour2"
                  couponsData={paramsGlobal.behavior.coupons}
                />
              )}

              {tabValue.tabs3 === 'tabBehaviour3' && (
                <GeneralSettingsContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabBehaviour3"
                  generalSettingsData={paramsGlobal.behavior.general_settings}
                  domainSelected={domainSelected}
                />
              )}
            </div>
            <div className={css.currentGame__content_game}>
              <div className={css.currentGame__content_gameBlock} />
              <div className={css.currentGame__content_gameTrigger}>
                <button type="button" className={css.currentGame__content_gameWidget}>
                  <h3 style={{ color: paramsGlobal.behavior.trigger_button.text_color }}>
                    {paramsGlobal.behavior.trigger_button.title}
                  </h3>
                  <div className={css.currentGame__content_gameWidget_icon}>
                    <img src={presentIcon} alt="present icon" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default connect(
  state => ({
    domainSelected: state.other.domainSelected,
    gameSettingsValue: state.other.gameSettingsValue,
    screenViewValue: state.other.screenViewValue,
    paramsData: state.get.getParams,
    gameSelected: state.other.gameSelected,
  }),
  dispatch => ({
    updateParamsAction: (params, data) => dispatch(updateParams(params, data)),
    screenViewAction: value => dispatch(screenView(value)),
    gameSettingsAction: value => dispatch(gameSettings(value)),
    createGameAction: (params, data) => dispatch(createGame(params, data)),
    addNotificationAction: data => dispatch(addNotification(data)),
    getGameListAction: params => dispatch(getGameList(params)),
  }),
)(Main);
