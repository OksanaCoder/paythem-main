import * as type from '../constants/games';

export const createGame = (params, data) => ({
  types: [type.CREATE_GAME_REQUEST, type.CREATE_GAME_SUCCESS, type.CREATE_GAME_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game`,
      method: 'POST',
      data,
    },
  },
});

export const getGameList = params => ({
  types: [type.GET_GAMES_REQUEST, type.GET_GAMES_SUCCESS, type.GET_GAMES_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game`,
      method: 'GET',
    },
  },
});

export const updateGameStatus = (params, data) => ({
  types: [type.UPDATE_GAMES_REQUEST, type.UPDATE_GAMES_SUCCESS, type.UPDATE_GAMES_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game/${params.gameId}/status`,
      method: 'PUT',
      data,
    },
  },
});

export const removeGame = params => ({
  types: [type.REMOVE_GAME_REQUEST, type.REMOVE_GAME_SUCCESS, type.REMOVE_GAME_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game/${params.gameId}`,
      method: 'DELETE',
    },
  },
});

export const getParams = params => ({
  types: [type.GET_PARAMS_REQUEST, type.GET_PARAMS_SUCCESS, type.GET_PARAMS_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game/${params.gameId}/params`,
      method: 'GET',
    },
  },
});

export const updateParams = (params, data) => ({
  types: [type.UPDATE_PARAMS_REQUEST, type.UPDATE_PARAMS_SUCCESS, type.UPDATE_PARAMS_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game/${params.gameId}/params`,
      method: 'PUT',
      data,
    },
  },
});

export const getStatisticsByGameId = (params, data) => ({
  types: [
    type.GET_STATS_BY_GAMEID_REQUEST,
    type.GET_STATS_BY_GAMEID_SUCCESS,
    type.GET_STATS_BY_GAMEID_FAILURE,
  ],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}/game/${params.gameId}/stats`,
      method: 'POST',
      data,
    },
  },
});
