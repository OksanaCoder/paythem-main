/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
// import cx from 'classnames';
import { Dialog, Slide } from '@material-ui/core';

import {
  getParams,
  createGame,
  gameSettings,
  screenView,
  addNotification,
  updateParams,
  getGameList,
} from 'actions';

import { PARAMS_DEFAULT } from 'config';

import HeaderCurrentGameComponent from 'modules/currentGame/components/HeaderCurrentGameComponent';
import TabsListCurrentGameComponent from 'modules/currentGame/components/TabsListCurrentGameComponent';
import PopupBackgroundContainer from 'modules/currentGame/containers/PopupBackgroundContainer';
import TriggerButtonContainer from 'modules/currentGame/containers/TriggerButtonContainer';

import css from 'styles/pages/CurrentGame.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Main extends React.Component {
  state = {
    tabValue: 'tabGame4',
    paramsGlobal: PARAMS_DEFAULT,
  };

  loadParamsByDomainAndGameIds = () => {
    const { getParamsAction, gameSelected, domainSelected } = this.props;
    const domainId = domainSelected.data._id;
    const gameId = gameSelected.data._id;
    getParamsAction({ domainId, gameId }).then(res => {
      if (!res.error) {
        const { paramsDataByIds } = this.getParamsByDomainAndGameIds();
        this.setState({ paramsGlobal: paramsDataByIds });
      }
    });
  };

  getParamsByDomainAndGameIds = () => {
    const {
      paramsData: { data, loaded, loading },
    } = this.props;
    const paramsDataByIds = loaded && data.data.data.params;
    return { paramsDataByIds, loaded, loading };
  };

  addGameByDomainId = () => {
    const { createGameAction, gameSelected, domainSelected } = this.props;
    const domainId = domainSelected.data._id;
    const gameName = gameSelected.data.name;
    const { paramsGlobal } = this.state;
    const params = { domainId };
    const data = { game: gameName, params: paramsGlobal };
    const notice = {
      success: 'Game created',
      error: 'Game error',
    };
    createGameAction(params, data).then(res => this.results(res, notice, true));
  };

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
      this.loadParamsByDomainAndGameIds();
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
      this.updateGameParamsByDomainAndGameId();
    } else {
      this.addGameByDomainId();
      const params = { domainId };
      getGameListAction(params);
    }

    // Close fullscreen dialog
    handleClose();
  };

  handleChangeTabsIntegration = (e, tabValue) => {
    this.setState({ tabValue });
  };

  handleCloseTabContent = () => {
    this.setState({ tabValue: false });
  };

  render() {
    const { openGameFullscreenDialog, handleClose, gameSelected, domainSelected } = this.props;
    const { tabValue, paramsGlobal } = this.state;
    console.log('gameSelected', gameSelected);
    console.log('domainSelected', domainSelected);

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

              <TabsListCurrentGameComponent
                tabValue={tabValue}
                handleChangeTabsIntegration={this.handleChangeTabsIntegration}
              />

              {tabValue === 'tabGame1' && (
                <PopupBackgroundContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue={tabValue}
                />
              )}

              {tabValue === 'tabGame4' && (
                <TriggerButtonContainer
                  handleCloseTabContent={this.handleCloseTabContent}
                  tabValue={tabValue}
                  editWidgetData={paramsGlobal.edit_widget}
                />
              )}

              {tabValue === 'tabGame3' && <div>Test 3</div>}
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
    getParamsAction: params => dispatch(getParams(params)),
    updateParamsAction: (params, data) => dispatch(updateParams(params, data)),
    screenViewAction: value => dispatch(screenView(value)),
    gameSettingsAction: value => dispatch(gameSettings(value)),
    createGameAction: (params, data) => dispatch(createGame(params, data)),
    addNotificationAction: data => dispatch(addNotification(data)),
    getGameListAction: params => dispatch(getGameList(params)),
  }),
)(Main);
