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
        AsyncStorage.setItem('token', `JWT ${data.token}`);
        loginUserSuccess(dispatch, username,data.token);
      }
    }).catch(function(error) {
      loginUserFail(dispatch);
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL});
}

const loginUserSuccess = (dispatch, user,token) => {
  axios({
    method: 'get',
    url: `${Config.API_URL}users/token`,
    headers: {
      'Authorization': 'JWT '+token
    }
  }).then(function(response) {
    console.log(response.data);
    dispatch({type: LOGIN_USER_SUCCESS, payload: response.data});
    Actions.home();
  }).catch(function(error) {
    console.log(error);
    dispatch({type: LOGIN_USER_FAIL});
  });
}
