import * as type from 'constants/other';
import { PARAMS_DEFAULT } from 'config';

export const addNotification = data => ({
  type: type.NOTIFICATION_ADD,
  payload: data,
});

export const removeNotification = data => ({
  type: type.NOTIFICATION_REMOVE,
  payload: data,
});

export const domainSelected = data => ({
  type: type.DOMAIN_SELECTED_ADD,
  payload: data,
});

export const gameSelected = data => ({
  type: type.GAME_SELECTED_ADD,
  payload: data,
});

export const paramsDefault = (data = PARAMS_DEFAULT, errors = {}) => ({
  type: type.PARAMS_DEFAULT_UPDATE,
  payload: data,
  errors,
});
