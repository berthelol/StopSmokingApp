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
import {fetchDays, addCigarette,fetchLastCigarette,deleteLastCigarette} from '../actions';
import Settings from './Settings';
import Footer from './Footer';
import {format_time,Config} from '../Config';

//no slide back to login
class Main extends Component {
  state = {
    modalShow: false,
    selectPastHours:false,
    cigaretteOffset:0,
    minute_separator:Config.minute_separator*60,
    showPastel:false
  };
  componentWillMount() {
    AsyncStorage.getItem('minute_separator').then((minute_separator) => {
      if(minute_separator!=null)
        this.setState({minute_separator: parseInt(minute_separator)*60});
    });
    Keyboard.dismiss();
    this.props.fetchDays(Config.slides_limit);
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
    const that = this;
    this.setState({selectPastHours:false});
    this.props.addCigarette(this.state.selectPastHours==true?this.state.cigaretteOffset:null,this.props.user,this.props.slides_limit,
      (label)=>{
        that.setState({showPastel:label});
        setTimeout(function(){ that.setState({showPastel:false}) }, 2000);
      });
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
      return <Text style={[styles.title,{fontSize:18}]}> Appuyez sur la cigarette à chaque fois que vous en fumez une. Laisse appuyer longtemps si jamais tu a oublié de la comptez la dernière fois. Laisse appuyer sur l'heure de la dernière cigarette pour l'annuler.</Text>
    return (
      <TouchableOpacity
        onLongPress={this.deleteLastCigarette.bind(this)}
        >
        <Text style={styles.subtitle}>{format_time(last_cigarette.time)}</Text>
        <Text>{this.props.lastDelete}</Text>
      </TouchableOpacity>
    );
  }
  deleteLastCigarette(){
    this.props.deleteLastCigarette(this.props.last.cigarette_id,this.props.slides_limit);
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
    if(this.state.showPastel){
      switch (this.state.showPastel) {
      case "Home":
        return <Image source={require('../images/Home.png')} style={styles.lungsIcon}/>
        break;
      case "Work":
        return <Image source={require('../images/Work.png')} style={styles.lungsIcon}/>
        break;
      case "Other":
        return <Image source={require('../images/Other.png')} style={styles.lungsIcon}/>
      }
    }
    if(this.props.last==''||this.props.last==null)return <View></View>
    const now = new Date();
    const time_now = now.getMinutes() * 60 + now.getHours() * 3600;
    let time_difference = time_now-this.props.last.time;
    time_difference>=0?"":time_difference+=86400;
    const variance = this.state.minute_separator - time_difference;
    let that = this;
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
  render() {
    const cigarettes = [];
    if(this.props.days.length!=0){
      this.props.days.forEach((day)=>{
        day.cigarettes.forEach((cigarette)=>{
          cigarettes.push(cigarette);
        });
      });
    }
    return (
      <View style={styles.container}>
        <Header username={this.props.user.username} onModalShow={this.onModalShow.bind(this)}/>
        {this.renderPastHoursCigarette()}
        {this.renderAddCigarette()}
        {this.renderPastelTimeCigarette()}
        <Text style={[styles.title,this.props.last==null?{display: 'none'}:{}]}>Dernière fumée:</Text>
        {this.renderLastCigarette(this.props.last)}
        <MyCarousel />
        <Footer lowerFooter cigarettes={cigarettes} mainContainerStyle={{marginBottom:100,flex:1}}/>
        <Settings onMinuteSeparatorChange={(minute_separator)=>this.setState({minute_separator:minute_separator*60})} visible={this.state.modalShow} onLogout={this.onLogout.bind(this)} onExit={this.onExit.bind(this)}/>
      </View>
    );
  }
};

mapStateToProps = (state) => {
  const {user} = state.auth;
  const {last,add_loading,label,days,lastDelete,slides_limit} = state.cigarette;
  return {user,last,add_loading,label,days,lastDelete,slides_limit};
}

export default connect(mapStateToProps, {fetchDays, addCigarette,fetchLastCigarette,deleteLastCigarette})(Main);
