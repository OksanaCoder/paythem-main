import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

import {
  getParams,
  createGame,
  gameSettings,
  screenView,
  addNotification,
  updateParams,
} from 'actions';

import { PARAMS_DEFAULT } from 'config';
import Fetching from 'components/Fetching';
import GameSettingsContainer from 'pages/Admin/GameConstructor/containers/GameSettingsContainer';
import WinSettingsContainer from 'pages/Admin/GameConstructor/containers/WinSettingsContainer';
import GlobalSettingsContainer from 'pages/Admin/GameConstructor/containers/GlobalSettingsContainer';
import EditCouponsContainer from 'pages/Admin/GameConstructor/containers/EditCouponsContainer';
import TabListComponent from 'pages/Admin/GameConstructor/components/TabListComponent';
import EditWidgetContainer from 'pages/Admin/GameConstructor/containers/EditWidgetContainer';

class GameConstructor extends React.Component {
  state = {
    tabValue: 0,
    active: 'editDesign',
    paramsGlobal: PARAMS_DEFAULT,
  };

  componentDidMount() {
    const { domainId, gameId } = this.queryParams();
    if (domainId && gameId) {
      this.loadParamsByDomainAndGameIds();
    }
  }

  loadParamsByDomainAndGameIds = () => {
    const { getParamsAction } = this.props;
    const { domainId, gameId } = this.queryParams();
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

  queryParams = () => {
    const {
      qparams: { domainId, gameId, name },
    } = this.props;
    return { domainId, gameId, name };
  };

  handleChangeTabsIntegration = (e, tabValue) => {
    this.setState({ tabValue });
  };

  handleGameSettings = value => () => {
    const { gameSettingsAction } = this.props;
    gameSettingsAction(value);
    this.setState({
      active: value,
    });
  };

  handleScreenView = value => () => {
    const { screenViewAction } = this.props;
    screenViewAction(value);
  };

  addGameByDomainId = name => {
    const { createGameAction, domainSelected } = this.props;
    const { paramsGlobal } = this.state;
    const params = { domainId: domainSelected.data._id };
    const data = { game: name, params: paramsGlobal };
    const notice = {
      success: 'Game created',
      error: 'Game error',
    };
    createGameAction(params, data).then(res => this.results(res, notice, true));
  };

  updateGameParamsByDomainAndGameId = () => {
    const { updateParamsAction } = this.props;
    const { paramsGlobal } = this.state;
    const { domainId, gameId } = this.queryParams();
    const params = { domainId, gameId };
    const data = { params: paramsGlobal };
    const notice = {
      success: 'Game updated',
      error: 'Game update error',
    };
    updateParamsAction(params, data).then(res => this.results(res, notice, false));
  };

  results = (res, notice, isCreated) => {
    const { addNotificationAction, history } = this.props;
    if (res.error) {
      addNotificationAction({
        type: 'error',
        text: notice.error,
      });
      return false;
    }

    if (isCreated) {
      const location = {
        pathname: '/home',
      };
      this.setState(
        {
          paramsGlobal: PARAMS_DEFAULT,
        },
        () => history.replace(location),
      );
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
    const { domainId, gameId, name } = this.queryParams();
    if (domainId && gameId) {
      this.updateGameParamsByDomainAndGameId();
    } else {
      this.addGameByDomainId(name);
    }
  };

  render() {
    // const { screenViewValue } = this.props;
    const { tabValue, active, paramsGlobal } = this.state;
    const { gameId } = this.queryParams();
    const { loading, loaded } = this.getParamsByDomainAndGameIds();
    // console.log('paramsGlobal', paramsGlobal);

    // const { paramsData } = this.props;
    // console.log('paramsData', paramsData);

    return (
      <section style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <h3>{!gameId ? 'Create the new game' : `Edit game params`}</h3>
        <Fetching isFetching={loading} bg>
          {(gameId || loaded || paramsGlobal !== undefined) && (
            <React.Fragment>
              <section style={{ marginTop: '100px' }}>
                <Grid container spacing={3}>
                  <Grid item>
                    <TabListComponent
                      tabValue={tabValue}
                      tabsChangeHandler={this.handleChangeTabsIntegration}
                    />
                  </Grid>
                  <Grid item>
                    {tabValue === 0 && (
                      <GameSettingsContainer
                        active={active}
                        handleGameSettings={this.handleGameSettings}
                        handleScreenView={this.handleScreenView}
                        gameSettingsData={paramsGlobal.game_settings}
                      />
                    )}
                    {tabValue === 1 && (
                      <WinSettingsContainer
                        active={active}
                        handleGameSettings={this.handleGameSettings}
                        handleScreenView={this.handleScreenView}
                        winSettingsData={paramsGlobal.win_settings}
                        winSettingsBackground={paramsGlobal.game_settings.bg_header}
                      />
                    )}
                    {tabValue === 2 && <EditCouponsContainer couponsData={paramsGlobal.coupons} />}
                    {tabValue === 3 && (
                      <GlobalSettingsContainer globalSettingsData={paramsGlobal.global_settings} />
                    )}
                    {tabValue === 4 && (
                      <EditWidgetContainer editWidgetData={paramsGlobal.edit_widget} />
                    )}
                  </Grid>
                </Grid>
              </section>
              <Button color="primary" variant="contained" onClick={this.handleSubmit}>
                {!gameId ? 'Create game' : 'Save game settings'}
              </Button>
            </React.Fragment>
          )}
        </Fetching>
      </section>
    );
  }
}

export default withRouter(
  connect(
    (state, props) => ({
      domainSelected: state.other.domainSelected,
      gameSettingsValue: state.other.gameSettingsValue,
      screenViewValue: state.other.screenViewValue,
      paramsData: state.get.getParams,
      qparams: props.match.params,
    }),
    dispatch => ({
      getParamsAction: params => dispatch(getParams(params)),
      updateParamsAction: (params, data) => dispatch(updateParams(params, data)),
      screenViewAction: value => dispatch(screenView(value)),
      gameSettingsAction: value => dispatch(gameSettings(value)),
      createGameAction: (params, data) => dispatch(createGame(params, data)),
      addNotificationAction: data => dispatch(addNotification(data)),
    }),
  )(GameConstructor),
);
