import React, {Component} from 'react';
import {Text,View} from 'react-native';
import {Card, CardSection, Input, Button, Spinner} from './common';
import {userChanged, passwordChanged, loginUser,loginUserWithoutAskingToken} from '../actions';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import styles from '../styles/index.style';
import {Actions} from 'react-native-router-flux';

class LoginForm extends Component {
  componentWillMount() {
    if(this.props.afterRegister){
      const {username, password} = this.props;
      this.props.loginUser({username, password})
    }
    AsyncStorage.getItem('token')
    .then((token)=>{
      console.log(token);
      if(token != null)
      this.props.loginUserWithoutAskingToken(token);
    });
  }
  onUserChange(text) {
    this.props.userChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const {username, password} = this.props;
    AsyncStorage.multiSet([['user', username], ['password', password]], (err)=>console.log(err));
    this.props.loginUser({username, password})
  }
  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large"/>;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }
  render() {
    return (
      <View>
      <Card>
        <CardSection style={{justifyContent: 'center'}}>
          <Text style={styles.loginTitle}>Login</Text>
        </CardSection>

        <CardSection>
          <Input label="Username" placeholder="fumeur du dimanche" value={this.props.username} onChangeText={this.onUserChange.bind(this)}/>
        </CardSection>

        <CardSection>
          <Input label="Password" secureTextEntry placeholder="password" value={this.props.password} onChangeText={this.onPasswordChange.bind(this)}/>
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>
      </Card>
      <View style={styles.loginSeparator}>
        <Text style={styles.loginSeparatorText}>Ou</Text>
      </View>

      <Card style={{marginTop:75}}>
        <CardSection>
            <Button onPress={()=>Actions.inscription()}>Ou inscris-toi</Button>
        </CardSection>
      </Card>
      </View>
    );
  }
}

mapStateToProps = ({auth}) => {
  const {username, password, error, loading} = auth;
  return {username, password, error, loading}
};
export default connect(mapStateToProps, {userChanged, passwordChanged, loginUser, loginUserWithoutAskingToken})(LoginForm);
