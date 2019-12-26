import * as type from 'constants/other';

export const addNotification = data => ({
  type: type.NOTIFICATION_ADD,
  payload: data,
});

export const removeNotification = data => ({
  type: type.NOTIFICATION_REMOVE,
  payload: data,
});

export const screenView = value => ({
  type: type.SCREEN_VIEW_ADD,
  payload: value,
});

export const domainSelected = data => ({
  type: type.DOMAIN_SELECTED_ADD,
  payload: data,
});

export const gameSelected = data => ({
  type: type.GAME_SELECTED_ADD,
  payload: data,
});
