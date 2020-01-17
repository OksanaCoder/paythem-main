import {
  register,
  login,
  isLoggedIn,
  loadProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  logout,
} from './user';

import { createDomain, getDomains, updateDomain, deleteDomain } from './domain';

import {
  createGame,
  getGameList,
  updateGameStatus,
  removeGame,
  getParams,
  updateParams,
  getStatisticsByGameId,
} from './games';

import {
  addNotification,
  removeNotification,
  domainSelected,
  gameSelected,
  paramsDefault,
  widgetView,
} from './other';

export {
  // users
  register,
  login,
  isLoggedIn,
  loadProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  logout,
  // constructor
  createDomain,
  getDomains,
  updateDomain,
  deleteDomain,
  // game
  createGame,
  getGameList,
  updateGameStatus,
  getParams,
  updateParams,
  removeGame,
  getStatisticsByGameId,
  // other
  addNotification,
  removeNotification,
  widgetView,
  domainSelected,
  gameSelected,
  paramsDefault,
};
