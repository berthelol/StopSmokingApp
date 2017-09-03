import React, {Component} from 'react';
import {Text,View,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles/index.style';
import {Card, CardSection, Input, Button, Spinner} from './common';
import {registerUser,userChanged, passwordChanged,fetchHomeAddress,fetchWorkAddress} from '../actions';

class InscriptionForm extends Component {
  state={homeAddress:'',workAddress:''};
  componentWillMount() {

  }

  onUserChange(text) {
    this.props.userChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onHomeAddressChange(homeAddress) {
    this.setState({homeAddress});
    this.props.fetchHomeAddress(homeAddress);
  }

  onWorkAddressChange(workAddress) {
    this.setState({workAddress})
    this.props.fetchWorkAddress(workAddress);
  }

  onButtonPress() {
    const {username,password} = this.props;
    console.log(this.props, this.state);
    this.props.registerUser(username ,password,this.props.home_address==null?this.state.homeAddress:this.props.home_address[0],this.props.work_address==null?this.state.workAddress:this.props.work_address[0]);
  }
  renderLoadingIconHome(){
    if(this.props.home_address_loading== null)return null;
    if(this.props.home_address_loading==false)
    {
      if(this.props.home_address_success==true)
        return (
          <CardSection>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({homeAddress:this.props.home_address[0].formattedAddress})} >
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1} >{this.props.home_address==null?"":this.props.home_address[0].formattedAddress}</Text>
            </TouchableOpacity>
          </CardSection>
        );
      if(this.props.home_address_success==false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
    }

    if(this.props.home_address_loading)
    {
      if(this.props.home_address_success==true)
        return (
          <CardSection >
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({homeAddress:this.props.home_address[0].formattedAddress})} >
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1} >{this.props.home_address==null?"":this.props.home_address[0].formattedAddress}</Text>
            </TouchableOpacity>
          </CardSection>
        );
      if(this.props.home_address_success==false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
      return <Spinner size='small'/>
    }
  }
  renderLoadingIconWork(){
    if(this.props.work_address_loading==null) return null;
    if(this.props.work_address_loading==false)
    {
      if(this.props.work_address_success==true)
        return (
          <CardSection>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({workAddress:this.props.work_address[0].formattedAddress})} >
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1} >{this.props.work_address==null?"":this.props.work_address[0].formattedAddress}</Text>
            </TouchableOpacity>
          </CardSection>
        );
      if(this.props.work_address_success==false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
    }

    if(this.props.work_address_loading)
    {
      if(this.props.work_address_success==true)
        return (
          <CardSection>
            <Image source={require('../images/checked.png')} style={styles.loadingIcon}></Image>
            <TouchableOpacity onPress ={() => this.setState({workAddress:this.props.work_address[0].formattedAddress})} >
              <Text numberOfLines={1}>Suggestion:</Text>
              <Text numberOfLines={1} >{this.props.work_address==null?"":this.props.work_address[0].formattedAddress}</Text>
            </TouchableOpacity>
          </CardSection>
        );
      if(this.props.work_address_success==false)
        return <Image source={require('../images/cancel.png')} style={styles.loadingIcon}></Image>
      return <Spinner size='small'/>
    }
  }
  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large"/>;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Inscription
      </Button>
    );
  }
  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input label="Username" placeholder="fumeur du dimanche" value={this.props.username} onChangeText={this.onUserChange.bind(this)}/>
          </CardSection>

          <CardSection>
            <Input label="Password" secureTextEntry placeholder="password" value={this.props.password} onChangeText={this.onPasswordChange.bind(this)}/>
          </CardSection>

          <CardSection>
              <Input label="Adresse Maison" placeholder="24 rue de a sablière 75016" value={this.state.homeAddress} onChangeText={this.onHomeAddressChange.bind(this)}/>
          </CardSection>
          {this.renderLoadingIconHome()}

          <CardSection>
            <Input label="Adresse Travail" placeholder="65 rue Dupond 75015" value={this.state.workAddress} onChangeText={this.onWorkAddressChange.bind(this)}/>
          </CardSection>
          {this.renderLoadingIconWork()}

          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderLoginButton()}
          </CardSection>
        </Card>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  const {username, password, error, loading,} = state.auth;
  const {home_address_loading,home_address,home_address_success,work_address_loading,work_address,work_address_success} = state.settings;
  return {username, password, error, loading,home_address_loading,home_address,home_address_success,work_address_loading,work_address,work_address_success}
};

export default connect(mapStateToProps, {registerUser,userChanged, passwordChanged,fetchHomeAddress,fetchWorkAddress})(InscriptionForm);
