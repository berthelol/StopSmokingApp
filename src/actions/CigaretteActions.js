import {
  ADD_CIGARETTE,
  ADD_CIGARETTE_FAILURE,
  ADD_CIGARETTE_SUCCESS,
  CIGARETTE_FETCH,
  CIGARETTE_FETCH_SUCCESS,
  CIGARETTE_FETCH_FAILURE,
  FETCH_CIGARETTES_SUCCESS,
  FETCH_CIGARETTES_FAILURE,
  LAST_CIGARETTE_FETCH_SUCCESS,
  LAST_CIGARETTE_FETCH_FAILURE,
  CIGARETTE_DELETE_SUCCESS,
  CIGARETTE_DELETE_FAILURE
} from './types';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {Config} from '../Config';

export const fetchDays = () => {
  return (dispatch) => {
    //dispatch({type: CIGARETTE_FETCH});
    AsyncStorage.getItem('token').then((token) => {
      axios({
        method: 'get',
        url: `${Config.API_URL}days`,
        headers: {
          'Authorization': token
        }
      }).then(function(response) {
        dispatch({type: CIGARETTE_FETCH_SUCCESS, payload: response.data});
      }).catch(function(error) {
        console.log(error);
        dispatch({type: CIGARETTE_FETCH_FAILURE});
      });
    });
  }
}

export const addCigarette = (timeOffset = 0,user) => {
  return (dispatch) => {
    dispatch({type: ADD_CIGARETTE});
    getDateAndTime(timeOffset,function(date, time) {
      navigator.geolocation.getCurrentPosition((position) => {
        getLocationSurroundingLabel({lat:position.coords.latitude,lng:position.coords.longitude},user.home_address.lat==0?null:user.home_address,user.work_address.lat==0?null:user.work_address, (label) => {
          AsyncStorage.multiGet(['token', 'packageprice']).then((storage) => {
            axios({
              method: 'post',
              url: `${Config.API_URL}cigarettes`,
              data: {
                time: time,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                price: storage[1][1] == null
                  ? Config.package_price_default / 20
                  : storage[1][1] / 20,
                date: date,
                label:label
              },
              headers: {
                'Authorization': storage[0][1]
              }
            }).then(function(response) {
              dispatch(fetchDays());
              dispatch(fetchLastCigarette());
              dispatch({type: ADD_CIGARETTE_SUCCESS, payload: label});
            }).catch(function(error) {
              console.log(error);
              dispatch({type: ADD_CIGARETTE_FAILURE});
            });
          });
        }, (error) => {
          dispatch({type: ADD_CIGARETTE_FAILURE});
          console.log(error.message);
        });
      })
    });
  }
};

export const deleteLastCigarette = (id) => {
  return (dispatch) =>{
    AsyncStorage.getItem('token').then((token) => {
      axios({
        method: 'delete',
        url: `${Config.API_URL}cigarettes/${id}`,
        headers: {
          'Authorization': token
        }
      }).then(function(response) {
        console.log(response);
        if(response.status==200){
          dispatch({type: CIGARETTE_DELETE_SUCCESS});
          dispatch(fetchDays());
          dispatch(fetchLastCigarette());
        }
      }).catch(function(error) {
        console.log(error);
        dispatch({type: CIGARETTE_DELETE_FAILURE});
      });
    });
  }
}

const getLocationSurroundingLabel = (currentLocation,home,work,cb) => {
  if(home!=null){
    if(calculateDistance(currentLocation,home))
      return cb("Home");
  }
  if(work!=null){
    if(calculateDistance(currentLocation,work))
      return cb("Work");
  }
  if(home!=null&&work!=null)
    return cb("Other");
  return cb("Other");
}
const calculateDistance = function(p1, p2) {
  const rad = function(x) {
    return x * Math.PI / 180;
  };
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  if(500>d) return true;
  return false;
};

const getDateAndTime = (timeOffset,cb) => {
  const d = new Date();
  const time = d.getMinutes() * 60 + d.getHours() * 3600 - timeOffset;
  const date = ("0" + (d.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + d.getDate().toString()).substr(-2) + "/" + (d.getFullYear().toString()).substr(2);
  cb(date, time);
}

export const fetchLastCigarette = () => {
  return (dispatch) => {
    //dispatch({type: CIGARETTE_FETCH});
    AsyncStorage.getItem('token').then((token) => {
      axios({
        method: 'get',
        url: `${Config.API_URL}cigarettes/last`,
        headers: {
          'Authorization': token
        }
      }).then(function(response) {
        dispatch({type: LAST_CIGARETTE_FETCH_SUCCESS, payload: response.data});
      }).catch(function(error) {
        console.log(error);
        dispatch({type: LAST_CIGARETTE_FETCH_FAILURE});
      });
    });
  }
};
