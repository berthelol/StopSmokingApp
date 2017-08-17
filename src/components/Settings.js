import React, {Component} from 'react';
import {Modal,View,TouchableOpacity,Image,Slider,Text} from 'react-native';
import {Button,CardSection} from './common';
import styles from '../styles/index.style';
import {AsyncStorage} from 'react-native';
import {Config} from '../Config';

class Settings extends Component {
  state={packprice:Config.package_price_default};
  ComponentWillMount(){
    AsyncStorage.getItem('packageprice')
    .then((price)=>{
      this.state.setState({packprice:price});
    });
  }
  sliderOnValueChange (price) {
    price = price.toFixed(2);
    this.setState({packprice:parseFloat(price)});
  }
  OkPush(){
  AsyncStorage.setItem('packageprice', ''+this.state.packprice);
  this.props.onExit();
  }

  render(){
    return(
      <Modal visible={this.props.visible} transparent animationType="fade" onRequestClose={() => {}}>
        <View style={styles.modal}></View>
        <View style={styles.modalcenter}>
          <TouchableOpacity onPress={this.props.onExit} >
            <Image source={require('../images/delete.png')} style={styles.deleteModal}></Image>
          </TouchableOpacity>
          <View>
            <Text style={styles.pickerLabel}>Prix d'un paquet: {this.state.packprice} €</Text>
            <Slider
              style={styles.picker}
              value={this.state.packprice}
              step={0.1}
              onValueChange={this.sliderOnValueChange.bind(this)}
              maximumValue={15} />
          </View>
          <View>
            <Button onPress={this.OkPush.bind(this)}> Ok</Button>
            <Button onPress={this.props.onLogout} style={{width:80,height:30,flex:0}}>Logout</Button>
          </View>
        </View>
        <View style={styles.modal}></View>
      </Modal>
    );
  }
}

export default Settings;
