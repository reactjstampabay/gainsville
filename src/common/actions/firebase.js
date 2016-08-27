export const SET_API = 'SET_API';

export function setApi(api) {
  return {
    type: SET_API,
    api: api
  };
}