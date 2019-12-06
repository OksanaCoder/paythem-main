/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Icon } from '@material-ui/core';

import { getGameList, removeGame } from 'actions';
import Fetching from 'components/Fetching';

// import css from 'styles/pages/...scss';

class GameConstructor extends Component {
  componentDidMount() {
    this.loadGameList();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data: nextPropsData } = nextProps.domainSelected;
    const { data } = this.props.domainSelected;
    if (nextPropsData._id !== data._id) {
      this.loadGameList(nextProps);
    }
  }

  loadGameList = async nextProps => {
    const { getGameListAction } = this.props;
    const {
      domainSelected: { data },
    } = nextProps ? nextProps : this.props;
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

  render() {
    const {
      domainSelected: {
        data: { _id },
      },
    } = this.props;
    const { gameList, loaded, loading } = this.getGameList();

    return (
      <section>
        <h3>Game List</h3>
        <Fetching isFetching={loading}>
          {loaded && (
            <React.Fragment>
              <ul>
                {loaded &&
                  gameList.map(gameItem => (
                    <li
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #ddd',
                      }}
                      key={gameItem._id}
                    >
                      <p>
                        <span>name: </span>
                        {gameItem.game}
                      </p>
                      <p>
                        <span>status: </span>
                        {gameItem.status ? 'active' : 'paused'}
                      </p>
                      <p>
                        <span>impr: </span>
                        {gameItem.statistics.impr}
                      </p>
                      <p>
                        <span>hits: </span>
                        {gameItem.statistics.hits}
                      </p>
                      <p>
                        <span>ctr: </span>
                        {gameItem.statistics.ctr}
                      </p>
                      <Link to={`/domain/${_id}/game/${gameItem._id}`}>
                        <IconButton>
                          <Icon>edit</Icon>
                        </IconButton>
                      </Link>
                      <IconButton onClick={this.handleRemoveGame(gameItem._id)}>
                        <Icon>delete</Icon>
                      </IconButton>
                    </li>
                  ))}
              </ul>
              <br />
              <br />
              <br />
              <Link to="/game/add">Create The Game</Link>
            </React.Fragment>
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
    domains: state.get.domains,
  }),
  dispatch => ({
    getGameListAction: params => dispatch(getGameList(params)),
    removeGameAction: params => dispatch(removeGame(params)),
  }),
)(GameConstructor);
