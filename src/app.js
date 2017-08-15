import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';
import firebase from 'firebase';
import Router from './router';
import Reactotron from 'reactotron-react-native';

console.ignoredYellowBox = [
    'Setting a timer'
];

class App extends Component {

  componentWillMount(){
    const config = {
    apiKey: 'AIzaSyCv1mC-pz7kllAFsFjKXn8tcHxVmGMOjUA',
    authDomain: 'authentication-943bb.firebaseapp.com',
    databaseURL: 'https://authentication-943bb.firebaseio.com',
    projectId: 'authentication-943bb',
    storageBucket: 'authentication-943bb.appspot.com',
    messagingSenderId: '691748651344'
    };
    firebase.initializeApp(config);
  }
  render() {
    const store = Reactotron.createStore(reducers,{},applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;
