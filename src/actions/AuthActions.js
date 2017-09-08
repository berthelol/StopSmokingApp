import {USERNAME_CHANGED, PASSWORD_CHANGED, HOME_ADDRESS_CHANGED, WORK_ADDRESS_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER,REGISTER_USER, REGISTER_BEGIN,USER_ALREADY_EXIST} from './types';
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

export const onHomeAddressChange = (text) => {
  return {type: HOME_ADDRESS_CHANGED, payload: text}
}

export const onWorkAddressChange = (text) => {
  return {type: WORK_ADDRESS_CHANGED, payload: text}
}

export const registerUser = (username,password, homeAddress,workAddress) => {
  return(dispatch)=>{
    dispatch({type:REGISTER_USER});
    axios({
      method: 'post',
      url: `${Config.API_URL}users`,
      data: {
          username: username,
          password: password,
          home_address: {
            address: typeof homeAddress== 'string' ?homeAddress:homeAddress.formattedAddress,
            lat: typeof homeAddress=='string'?0:homeAddress.position.lat,
            lng: typeof homeAddress=='string'?0:homeAddress.position.lng
          },
          work_address: {
            address: typeof workAddress=='string'?workAddress:workAddress.formattedAddress,
            lat: typeof workAddress=='string'?0:workAddress.position.lat,
            lng: typeof workAddress=='string'?0:workAddress.position.lng
          }
      },
      validateStatus: function (status) {
      return status >= 200 && status < 410; // default
    }
    }).then(function(response) {
        if (response.status!==200&&response.status!==409) {
          loginUserFail(dispatch);
        }else if(response.status==409) {
          dispatch({type: USER_ALREADY_EXIST});
        }else{
          Actions.login({afterRegister:true});
        }
      }).catch(error => {
        loginUserFail(dispatch);
      });
  }
}

export const loginUserWithoutAskingToken = (token) => {
  return (dispatch) => {
      dispatch({type: LOGIN_USER});
      loginUserSuccess(dispatch,token);
    };
};

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
        loginUserSuccess(dispatch,`JWT ${data.token}`);
      }
    }).catch(function(error) {
      loginUserFail(dispatch);
    });
  };
};

export const inscriptionBegin = () =>{
  return {type:REGISTER_BEGIN}
}

const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL});
}

const loginUserSuccess = (dispatch,token) => {
  axios({
    method: 'get',
    url: `${Config.API_URL}users/token`,
    headers: {
      'Authorization': token
    }
  }).then(function(response) {
    dispatch({type: LOGIN_USER_SUCCESS, payload: response.data});
    Actions.home();
  }).catch(function(error) {
    console.log(error);
    dispatch({type: LOGIN_USER_FAIL});
  });
}
