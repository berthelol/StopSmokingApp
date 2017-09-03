import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Main from './components/Main';
import LoginForm from './components/LoginForm';
import InscriptionForm from './components/InscriptionForm';
import DayDetail from './components/DayDetail';
import styles from './styles/index.style';

const RouterComponent =()=> {
  return (
    <Router >
      <Scene jey="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Stop Smoking App" initial/>
          <Scene key="inscription" component={InscriptionForm} title="Inscription"/>
        </Scene>
        <Scene key="home" >
          <Scene key="main" hideNavBar component={Main}/>
          <Scene key="dayDetail" component={DayDetail}/>
        </Scene>
      </Scene>
    </Router>
  );
};
export default RouterComponent;
