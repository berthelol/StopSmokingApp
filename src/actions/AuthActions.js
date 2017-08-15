import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from './types';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage} from 'react-native';


export const emailChanged = (text) => {
  return {type: EMAIL_CHANGED, payload: text}
}

export const passwordChanged = (text) => {
  return {type: PASSWORD_CHANGED, payload: text}
}

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER});

    axios.post('https://smokingstop.herokuapp.com/authenticate/token/local', {
      username: email,
      password: password
    }).then(function(response) {
      console.log(response);
      if (response.status == 401) {
        loginUserFail(dispatch);
      }else {
        const {data} = response;
        AsyncStorage.setItem('token', `JWT ${data.token}`);
        loginUserSuccess(dispatch, data);
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
