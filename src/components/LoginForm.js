import React, {Component} from 'react';
import {Text} from 'react-native';
import {Card, CardSection, Input, Button, Spinner} from './common';
import {userChanged, passwordChanged, loginUser} from '../actions';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';

class LoginForm extends Component {
  componentWillMount() {
    AsyncStorage.multiGet(['user', 'password'])
    .then((value)=>{    
      //User
      value[0][1] ? this.props.userChanged(value[0][1]) : console.log('no user');
      //Password
      value[1][1] ? this.props.passwordChanged(value[1][1]) : console.log('no password');
      const {username, password} = this.props;
      if(value[1][1] && value[0][1])
      this.props.loginUser({username, password})
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
  renderButton() {
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
      <Card>
        <CardSection>
          <Input label="username" placeholder="fumeur du dimanche" value={this.props.username} onChangeText={this.onUserChange.bind(this)}/>
        </CardSection>

        <CardSection>
          <Input label="password" secureTextEntry placeholder="password" value={this.props.password} onChangeText={this.onPasswordChange.bind(this)}/>
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  }
}
mapStateToProps = ({auth}) => {
  const {username, password, error, loading} = auth;
  return {username, password, error, loading}
};
export default connect(mapStateToProps, {userChanged, passwordChanged, loginUser})(LoginForm);
