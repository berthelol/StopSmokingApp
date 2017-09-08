import React, {Component} from 'react';
import {
  AsyncStorage,
  Modal,
  View,
  TouchableOpacity,
  Image,
  Slider,
  Text,
  TextInput
} from 'react-native';
import {Spinner, Button, CardSection, Card, Input} from './common';
import styles from '../styles/index.style';
import {Config} from '../Config';
import {fetchHomeAddress, fetchWorkAddress, setHomeAddress, setWorkAddress} from '../actions';
import {connect} from 'react-redux';

class Settings extends Component {
  state = {
    packprice: Config.package_price_default,
    minute_separator: Config.minute_separator,
    homeAddress: this.props.user.home_address.address,
    workAddress: this.props.user.work_address.address
  };
  componentWillMount() {
    AsyncStorage.getItem('packageprice').then((price) => {
      if (price != null)
        this.setState({packprice: parseFloat(price)});
      }
    );
    AsyncStorage.getItem('minute_separator').then((minute_separator) => {
      if (minute_separator != null)
        this.setState({minute_separator: parseInt(minute_separator)});
      }
    );
  }
  sliderPackPriceOnValueChange(price) {
    price = price.toFixed(2);
    this.setState({packprice: parseFloat(price)});
  }
  sliderMinuteSeparatorOnValueChange(minutes) {
    this.setState({minute_separator: minutes});
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
  onHomeAddressCHange(homeAddress) {
    this.setState({homeAddress});
    this.props.fetchHomeAddress(homeAddress);
  }
  onWorkAddressCHange(workAddress) {
    this.setState({workAddress});
    this.props.fetchWorkAddress(workAddress);
  }
  renderLoadingIconHome() {
    if (this.props.home_address_loading == null)
      return null;
    if (this.props.home_address_loading == false) {
      if (this.props.home_address_success == true)
        return (
          <View>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({homeAddress: this.props.home_address[0].formattedAddress})}>
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1}>{this.props.home_address == null ? "" : this.props.home_address[0].formattedAddress}</Text>
              <Text numberOfLines={1} style={styles.infoBoxTextinput}>Cliquer pour appliquer</Text>
            </TouchableOpacity>
          </View>
        );
      if (this.props.home_address_success == false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
    }

    if (this.props.home_address_loading) {
      if (this.props.home_address_success == true)
        return (
          <View>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({homeAddress: this.props.home_address[0].formattedAddress})}>
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1}>{this.props.home_address == null ? "" : this.props.home_address[0].formattedAddress}</Text>
              <Text numberOfLines={1} style={styles.infoBoxTextinput}>Cliquer pour appliquer</Text>
            </TouchableOpacity>
          </View>
        );
      if (this.props.home_address_success == false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
      return <Spinner size='small'/>
    }
  }
  renderLoadingIconWork() {

    if (this.props.work_address_loading == null)
      return null;
    if (this.props.work_address_loading == false) {
      if (this.props.work_address_success == true)
        return (
          <View>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({workAddress: this.props.work_address[0].formattedAddress})}>
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1}>{this.props.work_address == null  ? ""  : this.props.work_address[0].formattedAddress}</Text>
              <Text numberOfLines={1} style={styles.infoBoxTextinput}>Cliquer pour appliquer</Text>
            </TouchableOpacity>
          </View>
        );
      if (this.props.work_address_success == false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
    }

    if (this.props.work_address_loading) {
      if (this.props.work_address_success == true)
        return (
          <View>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({workAddress: this.props.work_address[0].formattedAddress})}>
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1}>{this.props.work_address == null ? ""  : this.props.work_address[0].formattedAddress}</Text>
              <Text numberOfLines={1} style={styles.infoBoxTextinput}>Cliquer pour appliquer</Text>
            </TouchableOpacity>
          </View>
        );
      if (this.props.work_address_success == false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
      return <Spinner size='small'/>
    }
  }
  OkPush() {
    AsyncStorage.setItem('packageprice', '' + this.state.packprice);
    AsyncStorage.setItem('minute_separator', '' + this.state.minute_separator);
    if (this.props.home_address != null) {
      AsyncStorage.setItem('homeAddressCoord', this.props.home_address[0].position.lat + ',' + this.props.home_address[0].position.lng);
      this.props.setHomeAddress(this.props.user.user_id, this.state.homeAddress, this.props.home_address[0].position.lat, this.props.home_address[0].position.lng);
    }
    if (this.props.work_address != null) {
      AsyncStorage.setItem('workAddressCoord', this.props.work_address[0].position.lat + ',' + this.props.work_address[0].position.lng);
      this.props.setWorkAddress(this.props.user.user_id, this.state.workAddress, this.props.work_address[0].position.lat, this.props.work_address[0].position.lng);
    }
    this.props.onMinuteSeparatorChange(this.state.minute_separator);
    this.props.onExit();
  }

  render() {
    return (
      <Modal style={{flex: 1,  overflow: 'hidden'}} visible={this.props.visible} transparent animationType="fade" onRequestClose={() => {}}>
        <View style={styles.modalcenter}>
          <TouchableOpacity onPress={this.props.onExit}>
            <Image source={require('../images/delete.png')} style={styles.deleteModal}></Image>
          </TouchableOpacity>
          <View>
            <Text style={styles.pickerLabel}>Prix d'un paquet: {this.state.packprice} €</Text>
            <Slider style={styles.picker} value={this.state.packprice} step={0.1} onValueChange={this.sliderPackPriceOnValueChange.bind(this)} maximumValue={15}/>
          </View>
          <View>
            <Text style={styles.pickerLabel}>Temps entre chaque cigarette: {this.convertNumberToTime(this.state.minute_separator * 60)} m</Text>
            <Slider style={styles.picker} value={this.state.minute_separator} step={10} onValueChange={this.sliderMinuteSeparatorOnValueChange.bind(this)} maximumValue={300} minimumValue={30}/>
          </View>
          <View>
            <View style={styles.settingInput}>
              <Text style={styles.settingInputLabel} numberOfLines={1}>Adresse Maison:</Text>
              <TextInput style={styles.settingInputText} autoCorrect={false} placeholder="22 rue Dupond 75014" value={this.state.homeAddress} onChangeText={this.onHomeAddressCHange.bind(this)} autoCapitalize='none'/>
               {this.renderLoadingIconHome()}
            </View>
            <View style={styles.settingInput}>
              <Text style={styles.settingInputLabel} numberOfLines={1}>Adresse Travail:</Text>
              <TextInput style={styles.settingInputText} autoCorrect={false} placeholder="56 rue George 79100" value={this.state.workAddress} onChangeText={this.onWorkAddressCHange.bind(this)} autoCapitalize='none'/>
              {this.renderLoadingIconWork()}
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.saveButton} onPress ={this.OkPush.bind(this)}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.logoutContainerModal} onPress={this.props.onLogout}>
            <Image source={require('../images/logout.png')} style={styles.logoutModal}></Image>
            <Text style={styles.logoutTextModal}>Logout</Text>
          </TouchableOpacity>
        </View>

      </Modal>
    );
  }
}

mapStateToProps = (state) => {
  const {
    home_address_loading,
    home_address,
    home_address_success,
    work_address_loading,
    work_address,
    work_address_success
  } = state.settings;
  const {user} = state.auth;
  return {
    user,
    home_address_loading,
    home_address,
    home_address_success,
    work_address_loading,
    work_address,
    work_address_success
  };
}

export default connect(mapStateToProps, {fetchHomeAddress, fetchWorkAddress, setHomeAddress, setWorkAddress})(Settings);
