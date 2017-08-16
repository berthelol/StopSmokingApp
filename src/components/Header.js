import React, {Component} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import styles from '../styles/index.style';

class Header extends Component{
  render(){
    return(
    <View style={styles.header}>
      <Text style={styles.headerGreatings}>Hello {this.props.username}</Text>
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
