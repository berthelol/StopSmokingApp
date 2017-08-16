import {combineReducers}  from 'redux';
import AuthReducer from './AuthReducer';
import CigaretteReducer from './CigaretteReducer';

export default combineReducers({
  auth:AuthReducer,
  cigarette:CigaretteReducer
});
