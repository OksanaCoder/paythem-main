import { combineReducers } from 'redux';

// api
import user from './user';
import domain from './domain';
import games from './games';
import params from './params';

// other
import authentication from './authentication';
import notification from './notification';
import other from './other';
import paramsDefault from './paramsDefault';

const reducers = combineReducers({
  get: combineReducers({
    authentication: authentication('authentication'),
    user: user('profile'),
    domains: domain('getDomains'),
    notifications: notification('notification'),
    getParams: params('getParams'),
    getParamsDefault: paramsDefault('paramsDefault'),
    gameList: games('gameList'),
  }),
  post: combineReducers({
    sendRegister: user('register'),
    sendLogin: user('login'),
    sendForgotPassword: user('forgotPassword'),
    sendResetPassword: user('resetPassword'),
  }),
  update: combineReducers({
    domain: domain('updateDomain'),
  }),
  other: combineReducers({
    domainSelected: other('domainSelected'),
    gameSelected: other('gameSelected'),
  }),
});

export default reducers;
