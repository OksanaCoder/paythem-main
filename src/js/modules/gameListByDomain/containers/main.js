/* eslint-disable no-undef */
/* eslint-disable no-new */
import React, { Component } from 'react';
import { sumBy } from 'lodash';
import { connect } from 'react-redux';

import {
  paramsDefault,
  getParams,
  getGameList,
  removeGame,
  updateGameStatus,
  gameSelected,
  widgetView,
  getStatisticsByGameId,
} from '../../../actions';
import Fetching from '../components/Fetching';

import GamesListForDomainComponent from '../../../modules/gameListByDomain/components/GamesListForDomainComponent';
import NoGamesComponent from '../../../modules/gameListByDomain/components/NoGamesComponent';
import TotalStatisticsComponent from '../../../modules/gameListByDomain/components/TotalStatisticsComponent';

class GameListByDomain extends Component {
  constructor(props) {
    super(props);

    this.csvLinkref = React.createRef();
  }

  componentDidMount() {
    this.loadGameList();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextPropsData } = nextProps.domainSelected;
    // eslint-disable-next-line react/destructuring-assignment
    const { data } = this.props.domainSelected;
    if (nextPropsData._id !== data._id) {
      this.loadGameList(nextProps);
    }
  }

  loadGameList = async nextProps => {
    const { getGameListAction } = this.props;
    const {
      domainSelected: { data },
    } = nextProps || this.props;
    if (data._id) {
      const params = {
        domainId: data._id,
      };
      await getGameListAction(params);
    }
  };

  getGameList = () => {
    const {
      games: { data, loaded, loading },
    } = this.props;
    const gameList = loaded && data.data.data;
    return { gameList, loaded, loading };
  };

  handleRemoveGame = gameId => () => {
    const { removeGameAction, domainSelected } = this.props;
    const params = {
      domainId: domainSelected.data._id,
      gameId,
    };
    removeGameAction(params).then(res => !res.error && this.loadGameList());
  };

  handleCheckedStatus = (event, gameStatus) => {
    console.log(gameStatus);
    const { domainSelected, updateGameStatusAction } = this.props;
    const params = {
      domainId: domainSelected.data._id,
      gameId: event.target.value,
    };

    const status = gameStatus ? { status: false } : { status: true };

    updateGameStatusAction(params, status).then(res => !res.error && this.loadGameList());
  };

  handleChooseGame = game => () => {
    const {
      getParamsAction,
      handleOpen,
      domainSelected,
      gameSelectedAction,
      paramsDefaultAction,
      widgetViewAction,
    } = this.props;
    const params = {
      domainId: domainSelected.data._id,
      gameId: game._id,
    };

    handleOpen('openGameFullscreenDialog')();
    widgetViewAction('start');
    gameSelectedAction(game);

    getParamsAction(params).then(res => {
      console.log('res', res);
      if (!res.error) {
        const { data } = res.payload.data;
        paramsDefaultAction(data.params);
      }
    });
  };

  calcTotalStatistics = () => {
    const { gameList } = this.getGameList();
    const impr = sumBy(gameList, o => o.statistics.impr);
    const hits = sumBy(gameList, o => o.statistics.hits);
    const ctr = impr !== 0 ? ((hits / impr) * 100).toFixed(2) : 0;

    return { impr, hits, ctr };
  };

  loadPtw = () => {
    const { getParamsDefault } = this.props;
    const script = document.createElement('script');
    script.src = 'http://157.230.112.210:5000/uploads/games/playthem-widget.min.js';
    script.id = 'ptw';
    script.onload = () => {
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

  /* eslint-disable */

  handleGetStatisticsByGameId = (gameId, gameName) => () => {
    // const { domainSelected } = this.props;
    const { getStatisticsByGameIdAction, domainSelected } = this.props;
    const params = {
      domainId: domainSelected.data._id,
      gameId,
    };
    const data = {
      from: Date.now(), // test
      to: Date.now(), // test
    };

    getStatisticsByGameIdAction(params, data).then(res => {
      if (res.payload) {
        console.log('thisss', this.csvLinkref);

        setTimeout(() => {
          this.csvLinkref.current.link.click();
          // this.csvLinkref.current.filename = `Playthem_stats_${gameName}_${gameId}.xlsx`;
        }, 100);
      }
    });
  };

  render() {
    const {
      domainSelected,
      toggleDrawer,
      rightPanel,
      gameStatistics, // paramsData, games,
    } = this.props;
    const { gameList, loaded, loading } = this.getGameList();
    const { impr, hits, ctr } = this.calcTotalStatistics();
    console.log(gameStatistics);

    return (
      <section>
        <Fetching isFetching={loading}>
          {loaded && gameList.length > 0 && (
            <React.Fragment>
              <TotalStatisticsComponent impr={impr} hits={hits} ctr={ctr} />
              <GamesListForDomainComponent
                gameList={gameList}
                id={domainSelected.data._id}
                gameStatistics={gameStatistics}
                handlePreviewWidget={this.handlePreviewWidget}
                handleRemoveGame={this.handleRemoveGame}
                handleCheckedStatus={this.handleCheckedStatus}
                handleChooseGame={this.handleChooseGame}
                handleGetStatisticsByGameId={this.handleGetStatisticsByGameId}
                csvLinkref={this.csvLinkref}
              />
            </React.Fragment>
          )}
          {loaded && gameList.length === 0 && (
            <NoGamesComponent toggleDrawer={toggleDrawer} rightPanel={rightPanel} />
          )}
        </Fetching>
      </section>
    );
  }
}

export default connect(
  state => ({
    domainSelected: state.other.domainSelected,
    paramsData: state.get.getParams,
    games: state.get.gameList,
    gameStatistics: state.get.getStatsByGameId,
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    widgetViewAction: value => dispatch(widgetView(value)),
    getGameListAction: params => dispatch(getGameList(params)),
    paramsDefaultAction: params => dispatch(paramsDefault(params)),
    getParamsAction: params => dispatch(getParams(params)),
    removeGameAction: params => dispatch(removeGame(params)),
    updateGameStatusAction: (params, data) => dispatch(updateGameStatus(params, data)),
    gameSelectedAction: data => dispatch(gameSelected(data)),
    getStatisticsByGameIdAction: (params, data) => dispatch(getStatisticsByGameId(params, data)),
  }),
)(GameListByDomain);
