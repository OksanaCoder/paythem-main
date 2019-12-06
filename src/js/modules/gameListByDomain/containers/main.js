import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGameList, removeGame, updateGameStatus, gameSelected } from 'actions';
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

  handleCheckedStatus = event => {
    const { domainSelected, updateGameStatusAction } = this.props;
    const params = {
      domainId: domainSelected.data._id,
      gameId: event.target.value,
    };

    const status = {
      status: true,
    };
    updateGameStatusAction(params, status).then(res => !res.error && this.loadGameList());
  };

  handleChooseGame = data => {
    const { handleOpen, gameSelectedAction } = this.props;

    handleOpen('openGameFullscreenDialog')();
    gameSelectedAction(data);
  };

  render() {
    const {
      domainSelected: {
        data: { _id },
      },
      toggleDrawer,
      rightPanel,
    } = this.props;
    const { gameList, loaded, loading } = this.getGameList();

    return (
      <section>
        <Fetching isFetching={loading}>
          {loaded && gameList.length > 0 && (
            <React.Fragment>
              <TotalStatisticsComponent />
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
    games: state.get.gameList,
  }),
  dispatch => ({
    getGameListAction: params => dispatch(getGameList(params)),
    removeGameAction: params => dispatch(removeGame(params)),
    updateGameStatusAction: (params, data) => dispatch(updateGameStatus(params, data)),
    gameSelectedAction: data => dispatch(gameSelected(data)),
  }),
)(GameListByDomain);
