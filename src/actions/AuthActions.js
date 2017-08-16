import {USERNAME_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from './types';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {Config} from '../Config';

export const userChanged = (text) => {
  return {type: USERNAME_CHANGED, payload: text}
}

export const passwordChanged = (text) => {
  return {type: PASSWORD_CHANGED, payload: text}
}

export const loginUser = ({username, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});
    axios.post(`${Config.API_URL}authenticate/token/local`, {
      username: username,
      password: password
    }).then(function(response) {
      if (response.status == 401) {
        loginUserFail(dispatch);
      }else {
        const {data} = response;
        console.log(data.token);
        AsyncStorage.setItem('token', `JWT ${data.token}`);
        loginUserSuccess(dispatch, username);
      }
    }).catch(function(error) {
      loginUserFail(dispatch);
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL});
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({type: LOGIN_USER_SUCCESS, payload: user});
  Actions.home();
}
