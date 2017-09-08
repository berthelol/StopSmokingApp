import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';
import Router from './router';
import Reactotron from 'reactotron-react-native';

console.ignoredYellowBox = [
    'Setting a timer'
];
const store = Reactotron.createStore(reducers,{},applyMiddleware(ReduxThunk));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;
