import { FETCH_EMPLOYEES, FETCH_EMPLOYEE, EDIT_EMPLOYEE, UPDATE_IN_ACTIVE, DELETE_IN_ACTIVE, FETCH_HERO_IMAGES } from '../actions/actionTypes';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return { ...state, ..._.mapKeys(action.payload, 'uid') };
    case FETCH_EMPLOYEE:
      return { ...state, [action.payload.uid]: action.payload };
    case EDIT_EMPLOYEE:
      return { ...state, [action.payload.uid]: action.payload };
    case UPDATE_IN_ACTIVE:
      return { ...state, [action.payload.uid]: action.payload };
    case DELETE_IN_ACTIVE:
      return _.omit(state, action.payload);
    case FETCH_HERO_IMAGES:
      return { ...state, ..._.mapKeys(action.payload, 'uid') };
    default:
      return state;
  }
}