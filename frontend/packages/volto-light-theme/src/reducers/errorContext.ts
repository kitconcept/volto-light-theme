import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';

const initialState = {};

export default function errorContext(state = initialState, action: any = {}) {
  switch (action.type) {
    case `${GET_CONTENT}_PENDING`:
      return {};
    case `${GET_CONTENT}_FAIL`:
      return action.error.response?.body ?? {};
    default:
      return state;
  }
}
