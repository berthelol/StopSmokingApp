import React, {Component} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import styles from '../styles/index.style';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Header extends Component{
  removeAllCache(){
      AsyncStorage.clear().then(()=>Actions.auth());
  }
  render(){
    return(
    <View style={styles.header}>
      <Text onPress={this.removeAllCache} style={styles.headerGreatings}>Hello {this.props.username}</Text>
      <TouchableOpacity onPress={this.props.onModalShow}>
        <Image
          source={require('../images/settings.png')}
          style={styles.settingsIcon}
        />
      </TouchableOpacity>
    </View>
  );
  }
}

export default Header;
