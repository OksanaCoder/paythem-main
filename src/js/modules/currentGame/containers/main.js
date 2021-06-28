/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable */
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
} from '../../../actions';
import Loader from '../../../components/Loader';

import HeaderCurrentGameComponent from '../components/headerCurrentGameComponent';
import TabsListComponent from '../../../modules/currentGame/components/TabsListComponent';
import PopupBackgroundContainer from '../../../modules/currentGame/containers/PopupBackgroundContainer';
import TriggerButtonContainer from '../../../modules/currentGame/containers/TriggerButtonContainer';
import CouponsOptionsContainer from '../../../modules/currentGame/containers/CouponsOptionsContainer';
import ColorSchemeContainer from '../../../modules/currentGame/containers/ColorSchemeContainer';
import StartScreenContainer from '../../../modules/currentGame/containers/StartScreenContainer';
import ProgressScreenContainer from '../../../modules/currentGame/containers/ProgressScreenContainer';
import FinishScreenContainer from '../../../modules/currentGame/containers/FinishScreenContainer';
import PrimaryIconContainer from '../../../modules/currentGame/containers/PrimaryIconContainer';
import GeneralSettingsContainer from '../../../modules/currentGame/containers/GeneralSettingsContainer';

import PtwModal from '../../../utils/PtwModal';

import '../../../../styles/pages/currentGame/Content.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Main extends React.Component {
  state = {
    tabValue: {
      tabs1: false,
      tabs2: false,
      tabs3: false,
    },
  };

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
    const { widgetViewAction } = this.props;
    this.setState(
      state => ({
        tabValue: {
          ...state.tabValue,
          [target]: value,
        },
      }),
      () => {
        const isValue = value !== 'progress' && value !== 'finish';
        widgetViewAction(isValue ? 'start' : value);
      },
    );
  };

  handleCloseTabContent = e => {
    const { widgetViewAction } = this.props;
    this.setState(
      {
        tabValue: {
          tabs1: false,
          tabs2: false,
          tabs3: false,
        },
      },
      () => widgetViewAction('start'),
    );
  };

  loadPtw = () => {
    const { getParamsDefault } = this.props;
    const script = document.createElement('script');
    script.src = 'http://157.230.112.210:5000/uploads/games/playthem-widget.min.js';
    script.id = 'ptw';
    script.onload = () => {
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line no-new
      new PTW({
        accessKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGRkMGEwNzk2N2NlZTBlOWQ2ZGExNTMiLCJkb21haW4iOiJ0b2RvLWxpc3QuaG8udWEiLCJ0eXBlIjoiYWNjZXNzS2V5IiwiaWF0IjoxNTc2ODU0OTU1fQ.Plyla2N0bG6-UmyhkhpDVxiceUcgd6f2mls29Y5VNCw',
        data: {
          game: 'roulette',
          params: getParamsDefault.data,
        },
        isPreview: true,
      });
    };

    document.body.appendChild(script);
  };

  handlePreviewWidget = () => {
    const scriptSpin2Wheel = document.querySelector(
      '[src="http://157.230.112.210:5000/uploads/games/roulette/Spin2WinWheel.js"]',
    );
    if (scriptSpin2Wheel) scriptSpin2Wheel.remove();
    const ptw = document.querySelector('#ptw');
    if (ptw) ptw.remove();
    this.loadPtw();
  };

  render() {
    const {
      openGameFullscreenDialog,
      handleClose,
      domainSelected,
      widgetViewValue,
      getParamsDefault,
      paramsData: { loading },
    } = this.props;
    const { tabValue } = this.state;
    const { data: paramsGlobal } = getParamsDefault;

    return (
      <React.Fragment>
        <Dialog
          fullScreen
          open={openGameFullscreenDialog}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <Loader isFetching={loading} />
          <HeaderCurrentGameComponent
            handleClose={handleClose}
            handleSubmit={this.handleSubmit}
            handlePreviewWidget={this.handlePreviewWidget}
          />

          <div className='currentGame__content'>
            <div className='currentGame__content_inner'>
              <div className='currentGame__content_leftMenu'>
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
                    iconData={paramsGlobal.game_style}
                  />
                )}

                {tabValue.tabs2 === 'start' && (
                  <StartScreenContainer
                    handleCloseTabContent={this.handleCloseTabContent}
                    tabValue="start"
                  />
                )}

                {tabValue.tabs2 === 'progress' && (
                  <ProgressScreenContainer
                    handleCloseTabContent={this.handleCloseTabContent}
                    tabValue="progress"
                  />
                )}

                {tabValue.tabs2 === 'finish' && (
                  <FinishScreenContainer
                    handleCloseTabContent={this.handleCloseTabContent}
                    tabValue="finish"
                  />
                )}

                {tabValue.tabs3 === 'tabBehaviour1' && (
                  <TriggerButtonContainer
                    handleCloseTabContent={this.handleCloseTabContent}
                    tabValue="tabBehaviour1"
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
                    domainSelected={domainSelected}
                    generalSettingsData={paramsGlobal.behavior.general_settings}
                  />
                )}
              </div>

              <div className='currentGame__content_game'>
                <div className='currentGame__content_gameBlock'>
                  <PtwModal
                    getParamsDefault={getParamsDefault}
                    widgetViewValue={widgetViewValue}
                    handlePreviewWidget={this.handlePreviewWidget}
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
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
