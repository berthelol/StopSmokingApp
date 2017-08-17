import React, {Component} from 'react';
import MyCarousel from './Carousel';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import styles from '../styles/index.style';
import {Actions} from 'react-native-router-flux';
import Header from './Header';
import {connect} from 'react-redux';
import {getAllCigarette, addCigarette} from '../actions';
import Settings from './Settings';

class Main extends Component {
  state = {
    modalShow: false
  };
  componentWillMount() {
    this.props.getAllCigarette();
  }
  onModalShow() {
    this.setState({
      'modalShow': !this.state.modalShow
    });
  }
  onLogout() {
    AsyncStorage.multiSet([
      [
        'user', ""
      ],
      ['password', ""]
    ], (err) => console.log(err));
    Actions.auth();
    this.setState({
      'modalShow': !this.state.modalShow
    });
  }
  onExit(){
    this.setState({modalShow:false});
  }
  addCigarette() {
    this.props.addCigarette();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header username={this.props.user} onModalShow={this.onModalShow.bind(this)}/>
        <TouchableOpacity onPress={this.addCigarette.bind(this)} style={styles.addCigBtnStyle}>
          <Image
            source={require('../images/smoking.png')}
            style={styles.addCigBtnIconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Example 1</Text>
        <Text style={styles.subtitle}>No momentum | Scale | Opacity</Text>
        <MyCarousel/>
        <Settings visible={this.state.modalShow} onLogout={this.onLogout.bind(this)} onExit={this.onExit.bind(this)}/>
      </View>
    );
  }
};

mapStateToProps = (state) => {
  const {user} = state.auth;
  return {user};
}

export default connect(mapStateToProps, {getAllCigarette, addCigarette})(Main);
