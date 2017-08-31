import {combineReducers}  from 'redux';
import AuthReducer from './AuthReducer';
import CigaretteReducer from './CigaretteReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  auth:AuthReducer,
  cigarette:CigaretteReducer,
  settings:SettingsReducer
});
