import { auth } from '../Firebase/Firebase';
import { REGISTER_SUCCESS,LOGIN_SUCCESS,LOGOUT,FETCH_USER} from '../actions/actionTypes';
import { Cookies } from 'react-cookie';

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
    currentUser: auth.currentUser.toJSON(),
  }
}

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
    currentUser: auth.currentUser.toJSON(),
  }
}

export const register = (formValues) => async dispatch => {
  try {
    await auth.createUserWithEmailAndPassword(formValues.email, formValues.password)
    dispatch(registerSuccess())
  } catch (error) {
    throw error
  }
}

export const login = (formValues) => async dispatch => {

  try {
    await auth.signInWithEmailAndPassword(formValues.email, formValues.password)
    dispatch(loginSuccess());
  } catch (error) {
    throw error
  }
}

export const logout = () => async dispatch => {

  try {
    await auth.signOut()
    dispatch({ type: LOGOUT, currentUser: auth.currentUser });
    cookies.remove('isAuthenticated', { path: '/' });
    cookies.remove('userUid', { path: '/' });
  } catch (error) {
    throw error
  }
}
export const cookies = new Cookies();
export const fetchUser = () => async dispatch => {
  try {
    await auth.onAuthStateChanged(currentUser => {
     
      if (currentUser) {  
        cookies.set('isAuthenticated', true, { path: '/' });  
        cookies.set('userUid', currentUser.uid, { path: '/' });   
        dispatch({
          type: FETCH_USER,
          currentUser: currentUser.toJSON(),
        })
      } else {
        cookies.set('isAuthenticated', false, { path: '/' });   
        dispatch({
          type: FETCH_USER,
          currentUser: null,
        })
      }
    })
  } catch (error) {
    throw error
  }
}