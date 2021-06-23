import * as type from '../constants/domain';

export const createDomain = data => ({
  types: [type.CREATE_DOMAIN_REQUEST, type.CREATE_DOMAIN_SUCCESS, type.CREATE_DOMAIN_FAILURE],
  payload: {
    request: {
      url: '/constructor/domain',
      method: 'POST',
      data,
    },
  },
});

export const getDomains = () => ({
  types: [type.GET_DOMAINS_REQUEST, type.GET_DOMAINS_SUCCESS, type.GET_DOMAINS_FAILURE],
  payload: {
    request: {
      url: '/constructor/domain',
      method: 'GET',
    },
  },
});

export const updateDomain = (domainId, data) => ({
  types: [type.UPDATE_DOMAIN_REQUEST, type.UPDATE_DOMAIN_SUCCESS, type.UPDATE_DOMAIN_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${domainId}`,
      method: 'PUT',
      data,
    },
  },
});

export const deleteDomain = params => ({
  types: [type.DELETE_DOMAIN_REQUEST, type.DELETE_DOMAIN_SUCCESS, type.DELETE_DOMAIN_FAILURE],
  payload: {
    request: {
      url: `/constructor/domain/${params.domainId}`,
      method: 'DELETE',
    },
  },
});
