/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Dialog, Slide } from '@material-ui/core';

import {
  createGame,
  addNotification,
  updateParams,
  getGameList,
  paramsDefault,
  widgetView,
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
import WidgetComponent from 'modules/currentGame/components/WidgetComponent';
import ProgressWidgetComponent from 'modules/currentGame/components/ProgressWidgetComponent';
import FinishWidgetComponent from 'modules/currentGame/components/FinishWidgetComponent';

import css from 'styles/pages/CurrentGame/Content.scss';

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

  updateGameParamsByGameId = () => {
    const {
      updateParamsAction,
      gameSelected,
      domainSelected,
      getParamsDefault: { data },
    } = this.props;
    const domainId = domainSelected.data._id;
    const gameId = gameSelected.data._id;

    const queryParams = {
      domainId,
      gameId,
    };
    const dataParams = {
      params: data,
    };
    const notice = {
      success: 'Game updated',
      error: 'Game update error',
    };

    updateParamsAction(queryParams, dataParams).then(res => this.results(res, notice, false));
  };

  addGameByDomainId = () => {
    const {
      createGameAction,
      gameSelected,
      domainSelected,
      getParamsDefault: { data },
    } = this.props;
    const queryParams = {
      domainId: domainSelected.data._id,
    };
    const dataParams = {
      game: gameSelected.data.name,
      params: data,
    };
    const notice = {
      success: 'Game created',
      error: 'Game error',
    };

    createGameAction(queryParams, dataParams).then(res => this.results(res, notice, true));
  };

  results = (res, notice) => {
    const { addNotificationAction } = this.props;
    if (res.error) {
      addNotificationAction({
        type: 'error',
        text: notice.error,
      });
      return false;
    }

    addNotificationAction({
      type: 'success',
      text: notice.success,
    });
    return false;
  };

  handleSubmit = () => {
    const { handleClose, getGameListAction, gameSelected, domainSelected } = this.props;
    const domainId = domainSelected.data._id;
    const gameId = gameSelected.data._id;

    if (domainId && gameId) {
      this.updateGameParamsByGameId();
    } else {
      this.addGameByDomainId();
      getGameListAction({ domainId });
    }

    // Close fullscreen dialog
    handleClose();
    this.handleCloseTabContent();
  };

  handleChangeTabsIntegration = target => (e, value) => {
    const { tabValue } = this.state;
    const { widgetViewAction } = this.props;
    this.setState({
      tabValue: {
        ...tabValue,
        [target]: value,
      },
    });
    widgetViewAction(value);
  };

  handleCloseTabContent = e => {
    const { paramsDefaultAction } = this.props;
    this.setState(
      {
        tabValue: {
          tabs1: false,
          tabs2: false,
          tabs3: false,
        },
      },
      () => paramsDefaultAction(),
    );
  };

  renderWidgetView = () => {
    const { widgetViewValue } = this.props;
    if (widgetViewValue === 'tabContentProgressView') {
      return <ProgressWidgetComponent />;
    }
    if (widgetViewValue === 'tabContentFinishView') {
      return <FinishWidgetComponent />;
    }
    return <WidgetComponent />;
  };

  render() {
    const { openGameFullscreenDialog, handleClose, domainSelected } = this.props;
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
                  colorSchemeData={paramsGlobal.game_style.color_scheme}
                />
              )}

              {tabValue.tabs1 === 'tabGame3' && (
                <PrimaryIconContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabGame3"
                  iconData={paramsGlobal.game_style}
                />
              )}

              {tabValue.tabs2 === 'tabContentStartView' && (
                <StartScreenContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabContentStartView"
                  startScreenData={paramsGlobal.content.start}
                />
              )}

              {tabValue.tabs2 === 'tabContentProgressView' && (
                <ProgressScreenContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabContentProgressView"
                  progressScreenData={paramsGlobal.content.progress}
                />
              )}

              {tabValue.tabs2 === 'tabContentFinishView' && (
                <FinishScreenContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue="tabContentFinishView"
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
              <div className={css.currentGame__content_gameBlock}>{this.renderWidgetView()}</div>
              <div className={css.currentGame__content_gameTrigger}>
                <button type="button" className={css.currentGame__content_gameWidget}>
                  <h3>{paramsGlobal.behavior.trigger_button.title}</h3>
                  <div className={css.currentGame__content_gameWidget_icon}>
                    <img src="" alt="present icon" />
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
    gameSelected: state.other.gameSelected,
    getParamsDefault: state.get.getParamsDefault,
    paramsData: state.get.getParams,
    widgetViewValue: state.other.widgetViewValue.data,
  }),
  dispatch => ({
    paramsDefaultAction: params => dispatch(paramsDefault(params)),
    getGameListAction: params => dispatch(getGameList(params)),
    createGameAction: (params, data) => dispatch(createGame(params, data)),
    updateParamsAction: (params, data) => dispatch(updateParams(params, data)),
    addNotificationAction: data => dispatch(addNotification(data)),
    widgetViewAction: params => dispatch(widgetView(params)),
  }),
)(Main);
