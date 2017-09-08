import React, {Component} from 'react';
import MyCarousel from './Carousel';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Slider,
  Keyboard
} from 'react-native';
import {Spinner} from './common';
import styles from '../styles/index.style';
import {Actions} from 'react-native-router-flux';
import Header from './Header';
import {connect} from 'react-redux';
import {fetchDays, addCigarette,fetchLastCigarette} from '../actions';
import Settings from './Settings';
import Footer from './Footer';
import {format_time,Config} from '../Config';

class Main extends Component {
  state = {
    modalShow: false,
    selectPastHours:false,
    cigaretteOffset:0,
    minute_separator:Config.minute_separator*60
  };
  componentWillMount() {
    AsyncStorage.getItem('minute_separator').then((minute_separator) => {
      if(minute_separator!=null)
        this.setState({minute_separator: parseInt(minute_separator)*60});
    });
    Keyboard.dismiss();
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
    this.setState({selectPastHours:false});
    this.props.addCigarette(this.state.selectPastHours==true?this.state.cigaretteOffset:null,this.props.user);
  }
  addLongPressCigarette(){
    this.setState({selectPastHours:!this.state.selectPastHours});
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
      return <TouchableOpacity onPress={this.addCigarette.bind(this)} onLongPress={this.addLongPressCigarette.bind(this)} style={styles.addCigBtnStyle}>
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
  renderPastHoursCigarette(){
    if(this.state.selectPastHours){
        return (
        <View>
          <Slider style={styles.cigaretteOffsetSlider} onValueChange={(cigaretteOffset)=>this.setState({cigaretteOffset})} value={this.state.cigaretteOffset} step={600} maximumValue={14400}/>
          <Text style={styles.cigaretteOffsetTextOutput}>Il y a {format_time(this.state.cigaretteOffset)}</Text>
        </View>
      );
    }
  }
  renderPastelTimeCigarette(){
    if(this.props.last==''||this.props.last==null)return <View></View>
    const now = new Date();
    const time_now = now.getMinutes() * 60 + now.getHours() * 3600;
    let time_difference = time_now-this.props.last.time;
    time_difference>=0?"":time_difference+=86400;
    const variance = this.state.minute_separator - time_difference;
    if (variance < 0) {
      return <View>
        <Image
        source={require('../images/lungs_green.png')}
        style={styles.lungsIcon}/>
      </View>
    }
    if (variance > 0 && variance <= 1800) {
      return <View>
        <Image
        source={require('../images/lungs_orange.png')}
        style={styles.lungsIcon}/>
      </View>
    }
    if (variance >1800) {
      return <View>
        <Image
        source={require('../images/lungs_red.png')}
        style={styles.lungsIcon}/>
      </View>
    }
  }
  renderLabelCigarette(){
    if(this.props.label){
      switch (this.props.label) {
        case "Home":
          return <Image source={require('../images/Home.png')} style={styles.lungsIcon}/>
          break;
          case "Work":
          return <Image source={require('../images/Work.png')} style={styles.lungsIcon}/>
          break;
        default:
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header username={this.props.user.username} onModalShow={this.onModalShow.bind(this)}/>
        {this.renderPastHoursCigarette()}
        {this.renderAddCigarette()}
        {this.renderPastelTimeCigarette()}
        <Text style={[styles.title,this.props.last==null?{display: 'none'}:{}]}>Dernière fumée:</Text>
        {this.renderLastCigarette(this.props.last)}
        {this.renderLabelCigarette()}
        <MyCarousel/>
        <Footer />
        <Settings onMinuteSeparatorChange={(minute_separator)=>this.setState({minute_separator:minute_separator*60})} visible={this.state.modalShow} onLogout={this.onLogout.bind(this)} onExit={this.onExit.bind(this)}/>
      </View>
    );
  }
};

mapStateToProps = (state) => {
  const {user} = state.auth;
  const {last,add_loading,label} = state.cigarette;
  return {user,last,add_loading,label};
}

export default connect(mapStateToProps, {fetchDays, addCigarette,fetchLastCigarette})(Main);
