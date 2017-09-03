import React, {Component} from 'react';
import MyCarousel from './Carousel';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {Spinner} from './common';
import styles from '../styles/index.style';
import {Actions} from 'react-native-router-flux';
import Header from './Header';
import {connect} from 'react-redux';
import {fetchDays, addCigarette,fetchLastCigarette} from '../actions';
import Settings from './Settings';
import Footer from './Footer';
import {format_time} from '../Config';

class Main extends Component {
  state = {
    modalShow: false
  };
  componentWillMount() {
    this.props.fetchDays();
    this.props.fetchLastCigarette();
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
      ['password', ""],
      ['token','']
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
  renderLastCigarette(last_cigarette){
    if(last_cigarette=='')
    {
      return <Spinner />
    }
    if(last_cigarette==null)
      return <Text style={styles.title}> Appuyez sur la cigarette à chaque fois que vous en fumez une</Text>
    return <Text style={styles.subtitle}>{format_time(last_cigarette.time)}</Text>;
  }
  renderAddCigarette(){
    if(this.props.add_loading==false){
      return<TouchableOpacity onPress={this.addCigarette.bind(this)} style={styles.addCigBtnStyle}>
        <Image
          source={require('../images/smoking.png')}
          style={styles.addCigBtnIconStyle}
        />
      </TouchableOpacity>
    }else {
      return <View style={styles.addCigBtnStyle}>
        <Image
          source={require('../images/smoking_loading.gif')}
          style={styles.addCigBtnIconStyle}
        />
      </View>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header username={this.props.user.username} onModalShow={this.onModalShow.bind(this)}/>
        {this.renderAddCigarette()}
        <Text style={[styles.title,this.props.last==null?{display: 'none'}:{}]}>Dernière fumée:</Text>
        {this.renderLastCigarette(this.props.last)}
        <MyCarousel/>
        <Footer />
        <Settings visible={this.state.modalShow} onLogout={this.onLogout.bind(this)} onExit={this.onExit.bind(this)}/>
      </View>
    );
  }
};

mapStateToProps = (state) => {
  const {user} = state.auth;
  const {last,add_loading} = state.cigarette;
  return {user,last,add_loading};
}

export default connect(mapStateToProps, {fetchDays, addCigarette,fetchLastCigarette})(Main);
