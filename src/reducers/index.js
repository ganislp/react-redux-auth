import { combineReducers } from 'redux';
import employeeReducer from './EmployeeReducer';
import heroImagesReducer from './HeroImagesReducer';
import AuthReducer from './AuthReducer'
import { reducer as formReducer } from 'redux-form';
export default combineReducers({
  employees:employeeReducer,
  heroImagesList:heroImagesReducer,
  currentUser:AuthReducer,
  form: formReducer,
})