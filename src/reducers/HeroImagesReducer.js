import { FETCH_HERO_IMAGES } from '../actions/actionTypes';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_HERO_IMAGES:
      return { ...state, ..._.mapKeys(action.payload, 'uid') };
    default:
      return state;
  }
}