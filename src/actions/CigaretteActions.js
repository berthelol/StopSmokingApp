import {ADD_CIGARETTE_FAILURE,ADD_CIGARETTE_SUCCESS,CIGARETTE_FETCH,CIGARETTE_FETCH_SUCCESS,CIGARETTE_FETCH_FAILURE} from './types';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {Config} from '../Config';

export const getAllCigarette=() =>{

  return (dispatch) =>{
    //dispatch({type: CIGARETTE_FETCH});
    AsyncStorage.getItem('token').then((token)=>{
      axios({
        method: 'get',
        url: `${Config.API_URL}days`,
        headers: {
          'Authorization': token
        }
      }).then(function(response) {
        console.log(response.data);
        dispatch({type: CIGARETTE_FETCH_SUCCESS,payload:response.data});
      }).catch(function(error) {
        console.log(error);
        dispatch({type: CIGARETTE_FETCH_FAILURE});
      });
    });
  }
}
export const addCigarette = () => {
  return (dispatch) => {
    const d = new Date();
    const time = d.getMinutes() * 60 + d.getHours() * 3600;
    const date = ("0" + (d.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + d.getDate().toString()).substr(-2) + "/" + (d.getFullYear().toString()).substr(2);
    navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          AsyncStorage.getItem('token').then((token)=>{
            axios({
              method: 'post',
              url: `${Config.API_URL}cigarettes`,
              data: {
                time: time,
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                price: (9.2 / 20),
                date: date
              },
              headers: {
                'Authorization': token
              }
            }).then(function(response) {
              dispatch(getAllCigarette());
              dispatch({type: ADD_CIGARETTE_SUCCESS,payload:"success"});
            }).catch(function(error) {
              console.log(error);
              dispatch({type: ADD_CIGARETTE_FAILURE});
            });
          });
        },
        (error) => {
          dispatch({type: ADD_CIGARETTE_FAILURE});
          console.log(error.message);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

  };
};
