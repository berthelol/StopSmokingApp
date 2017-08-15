import React, {Component} from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';
import styles from '../styles/index.style';

class Header extends Component{
  render(){
    return(    
    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
      <Text style={{alignSelf: 'flex-start',marginTop:20}}>Hello Loïc</Text>
      <TouchableOpacity onPress={this.props.onModalShow}>
        <Image
          source={require('../images/settings.png')}
          style={styles.barButtonIconStyle}
        />
      </TouchableOpacity>
    </View>
  );
  }
}

export default Header;
