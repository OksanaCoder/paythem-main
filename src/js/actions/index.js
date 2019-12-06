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
} from './games';

import {
  addNotification,
  removeNotification,
  gameSettings,
  screenView,
  domainSelected,
  gameSelected,
  // updateCoupon,
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
  // other
  addNotification,
  removeNotification,
  gameSettings,
  screenView,
  domainSelected,
  gameSelected,
};
