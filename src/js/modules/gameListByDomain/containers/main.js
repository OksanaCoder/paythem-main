import React, { Component } from 'react';
import { sumBy } from 'lodash';
import { connect } from 'react-redux';

import { getParams, getGameList, removeGame, updateGameStatus, gameSelected } from 'actions';
import Fetching from 'components/Fetching';

import GamesListForDomainComponent from 'modules/gameListByDomain/components/GamesListForDomainComponent';
import NoGamesComponent from 'modules/gameListByDomain/components/NoGamesComponent';
import TotalStatisticsComponent from 'modules/gameListByDomain/components/TotalStatisticsComponent';

class GameListByDomain extends Component {
  componentDidMount() {
    this.loadGameList();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.games.data.data);
    // eslint-disable-next-line react/destructuring-assignment
    console.log('Props', this.props.games.data.data);
    const { data: nextPropsData } = nextProps.domainSelected;
    // eslint-disable-next-line react/destructuring-assignment
    const { data } = this.props.domainSelected;
    if (nextPropsData._id !== data._id) {
      this.loadGameList(nextProps);
    }
  }

  // componentDidUpdate(prevProps){
  //   console.log('prevProps', prevProps.games.data.data)
  //   // eslint-disable-next-line react/destructuring-assignment
  //   console.log('props', this.props.games.data.data)
  // }

  // loadParamsByDomainAndGameIds = () => {
  //   const { getParamsAction, gameSelected, domainSelected } = this.props;
  //   const domainId = domainSelected.data._id;
  //   const gameId = gameSelected.data._id;
  //   getParamsAction({ domainId, gameId }).then(res => {
  //     if (!res.error) {
  //       const { paramsDataByIds } = this.getParamsByDomainAndGameIds();
  //       this.setState({ paramsGlobal: paramsDataByIds });
  //     }
  //   });
  // };

  // getParamsByDomainAndGameIds = () => {
  //   const {
  //     paramsData: { data, loaded, loading },
  //   } = this.props;
  //   const paramsDataByIds = loaded && data.data.data.params;
  //   return { paramsDataByIds, loaded, loading };
  // };

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

  handleChooseGame = data => () => {
    const { getParamsAction, handleOpen, domainSelected, gameSelectedAction } = this.props;
    const params = {
      domainId: domainSelected.data._id,
      gameId: data._id,
    };

    handleOpen('openGameFullscreenDialog')();
    gameSelectedAction(data);
    getParamsAction(params);
  };

  calcTotalStatistics = () => {
    const { gameList } = this.getGameList();
    const impr = sumBy(gameList, o => o.statistics.impr);
    const hits = sumBy(gameList, o => o.statistics.hits);
    const ctr = impr !== 0 ? ((hits / impr) * 100).toFixed(2) : 0;

    return { impr, hits, ctr };
  };

  render() {
    const {
      domainSelected: {
        data: { _id },
      },
      toggleDrawer,
      rightPanel,
      // paramsData,
      // games,
    } = this.props;
    const { gameList, loaded, loading } = this.getGameList();
    const { impr, hits, ctr } = this.calcTotalStatistics();

    console.log('gameList', gameList);

    return (
      <section>
        <Fetching isFetching={loading}>
          {loaded && gameList.length > 0 && (
            <React.Fragment>
              <TotalStatisticsComponent impr={impr} hits={hits} ctr={ctr} />
              <GamesListForDomainComponent
                gameList={gameList}
                id={_id}
                handleRemoveGame={this.handleRemoveGame}
                handleCheckedStatus={this.handleCheckedStatus}
                handleChooseGame={this.handleChooseGame}
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
  }),
  dispatch => ({
    getGameListAction: params => dispatch(getGameList(params)),
    getParamsAction: params => dispatch(getParams(params)),
    removeGameAction: params => dispatch(removeGame(params)),
    updateGameStatusAction: (params, data) => dispatch(updateGameStatus(params, data)),
    gameSelectedAction: data => dispatch(gameSelected(data)),
  }),
)(GameListByDomain);
