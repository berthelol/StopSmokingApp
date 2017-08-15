import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Main from './components/Main';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
  return (
    <Router style={{paddingTop: 65}}>
      <Scene jey="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please login" initial/>
        </Scene>
          <Scene key="main" component={Main}/>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
