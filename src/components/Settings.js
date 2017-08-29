import React, {Component} from 'react';
import {AsyncStorage,Modal,View,TouchableOpacity,Image,Slider,Text} from 'react-native';
import {Button,CardSection,Card,Input} from './common';
import styles from '../styles/index.style';
import {Config} from '../Config';
//import Geocoder from 'react-native-geocoder';

class Settings extends Component {
  state={packprice:Config.package_price_default,minute_separator:Config.minute_separator,homeAdress:"",workAddress:""};
  componentWillMount(){
    AsyncStorage.getItem('packageprice')
    .then((price)=>{
      this.setState({packprice:parseFloat(price)});
    });
    AsyncStorage.getItem('minute_separator')
    .then((minute_separator)=>{
      this.setState({minute_separator:parseInt(minute_separator)});
    });
    AsyncStorage.getItem('homeAdress')
    .then((homeAdress)=>{
      this.setState({homeAdress});
    });
    AsyncStorage.getItem('workAddress')
    .then((workAddress)=>{
      this.setState({workAddress});
    });
  }
  sliderPackPriceOnValueChange (price) {
    price = price.toFixed(2);
    this.setState({packprice:parseFloat(price)});
  }
  sliderMinuteSeparatorOnValueChange (minutes){
    this.setState({minute_separator:minutes});
  }
  convertNumberToTime(time) {
    hours = Math.floor(time / 3600);
    hours = hours < 10
      ? "0" + hours
      : hours;
    time %= 3600;
    minutes = Math.floor(time / 60);
    minutes = minutes < 10
      ? "0" + minutes
      : minutes;
    return hours + "h" + minutes;
  }
  OkPush(){
  //  Geocoder.geocodeAddress(this.state.homeAdress).then(res => {
    //  console.log(res);
    // res is an Array of geocoding object (see below)
//})
//.catch(err => console.log(err))
    AsyncStorage.setItem('packageprice', ''+this.state.packprice);
    AsyncStorage.setItem('minute_separator', ''+this.state.minute_separator);
    AsyncStorage.setItem('homeAdress', this.state.homeAdress);
    AsyncStorage.setItem('workAddress', this.state.workAddress);
    this.props.onExit();
  }

  render(){
    return(
      <Modal visible={this.props.visible} transparent animationType="fade" onRequestClose={() => {}}>
        <View style={styles.modalborder}></View>
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
              onValueChange={this.sliderPackPriceOnValueChange.bind(this)}
              maximumValue={15} />
          </View>
          <View>
            <Text style={styles.pickerLabel}>Temps entre chaque cigarette: {this.convertNumberToTime(this.state.minute_separator*60)} m</Text>
            <Slider
              style={styles.picker}
              value={this.state.minute_separator}
              step={10}
              onValueChange={this.sliderMinuteSeparatorOnValueChange.bind(this)}
              maximumValue={300}
              minimumValue={30} />
          </View>
          <View>
            <View style={styles.settingInput}>
              <Input label="Adresse Maison:" placeholder="22 rue Dupond 75014" value={this.state.homeAdress} onChangeText={homeAdress => this.setState({homeAdress})}/>
            </View>
            <View style={styles.settingInput}>
              <Input label="Adresse Travail:" placeholder="56 rue George 79100" value={this.state.workAddress} onChangeText={workAddress => this.setState({workAddress})}/>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress ={this.OkPush.bind(this)} >
              <Text style={styles.subtitle}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutContainerModal} onPress={this.props.onLogout} >
            <Image source={require('../images/logout.png')} style={styles.logoutModal}></Image>
            <Text style={styles.logoutTextModal}>Logout</Text>
          </TouchableOpacity>

          </View>

        <View style={styles.modalborder}></View>
      </Modal>
    );
  }
}

export default Settings;
