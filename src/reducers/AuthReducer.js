import { REGISTER_SUCCESS,LOGIN_SUCCESS,LOGOUT,FETCH_USER} from '../actions/actionTypes';


export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT:
    case FETCH_USER:
      return action.currentUser;
    default:
      return state;
  }
}