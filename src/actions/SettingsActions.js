import {AsyncStorage} from 'react-native';
import {
  FETCH_HOME_ADDRESS,
  FETCH_HOME_ADDRESS_SUCCESS,
  FETCH_HOME_ADDRESS_FAILURE,
  FETCH_WORK_ADDRESS,
  FETCH_WORK_ADDRESS_SUCCESS,
  FETCH_WORK_ADDRESS_FAILURE,
  SET_HOME_ADDRESS_SUCCESS,
  SET_HOME_ADDRESS_FAILURE,
  SET_WORK_ADDRESS_SUCCESS,
  SET_WORK_ADDRESS_FAILURE
} from './types';
import Geocoder from 'react-native-geocoder';
import {Config} from '../Config';
import axios from 'axios';

export const fetchHomeAddress = (home_address) => {
  console.log(home_address);
  return (dispatch) => {
    dispatch({type: FETCH_HOME_ADDRESS});

    Geocoder.geocodeAddress(home_address).then(res => {
      dispatch({type: FETCH_HOME_ADDRESS_SUCCESS, payload: res});
    }).catch(err => {
      dispatch({type: FETCH_HOME_ADDRESS_FAILURE});
      console.log(err);
    });
  }
}

export const fetchWorkAddress = (work_address) => {
  return (dispatch) => {
    dispatch({type: FETCH_WORK_ADDRESS});
    Geocoder.geocodeAddress(work_address).then(res => {
      dispatch({type: FETCH_WORK_ADDRESS_SUCCESS, payload: res});
    }).catch(err => {
      dispatch({type: FETCH_WORK_ADDRESS_FAILURE});
      console.log(err);
    });
  }
}

export const setHomeAddress = (id, home_address, lat, lng) => {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        method: 'patch',
        url: `${Config.API_URL}users/${id}`,
        data: {
          home_address: {
            address: home_address,
            lat: lat,
            lng: lng
          }
        },
        headers: {
          'Authorization': token
        }
      }).then(function(response) {
        dispatch({
          type: SET_HOME_ADDRESS_SUCCESS,
          payload: {
            address: home_address,
            lat: lat,
            lng: lng
          }
        });
      }).catch(function(error) {
        dispatch({type: SET_HOME_ADDRESS_FAILURE});
      });
    });
  }
}
export const setWorkAddress = (id, work_address, lat, lng) => {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        method: 'patch',
        url: `${Config.API_URL}users/${id}`,
        data: {
          work_address: {
            address: work_address,
            lat: lat,
            lng: lng
          }
        },
        headers: {
          'Authorization': token
        }
      }).then(function(response) {
        dispatch({
          type: SET_WORK_ADDRESS_SUCCESS,
          payload: {
              address: work_address,
              lat: lat,
              lng: lng
          }
        });
      }).catch(function(error) {
        dispatch({type: SET_WORK_ADDRESS_FAILURE});
      });
    });
  }
}
