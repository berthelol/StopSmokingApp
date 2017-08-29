import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles/index.style';
import {Config,format_time} from '../Config';

class Header extends Component {
  renderTotalLifeLost(){
    let lifeLost=0;
    this.props.days.forEach(function(day){
      lifeLost+=day.cigarettes.length;
    });
    return format_time(lifeLost*Config.lifetimePerCigarette*60);
  }
  renderTotalCigarettesSmoked(){
    let cigaretteSmoked=0;
    this.props.days.forEach(function(day){
      cigaretteSmoked+=day.cigarettes.length;
    });
    return cigaretteSmoked;
  }
  renderTotalPrice(){
    let cigarettePrice=0;
    this.props.days.forEach(function(day){
      day.cigarettes.forEach(function(cigarette){
        cigarettePrice+=cigarette.price;
      });
    });
    return cigarettePrice.toFixed(2);
  }
  render(){
    if(this.props.days=='') return <View></View>
    return (
      <View style={styles.footerContainer}>

        <View>
          <Text style={styles.footerTitle} >Total vie perdue</Text>
          <Text style={styles.subtitle} >{this.renderTotalLifeLost()}</Text>
        </View>

        <View>
          <Text style={styles.footerTitle} >Total fumées</Text>
          <Text style={styles.subtitle} >{this.renderTotalCigarettesSmoked()}</Text>
        </View>

        <View>
          <Text style={styles.footerTitle} >Total dépensés</Text>
          <Text style={styles.subtitle} >{this.renderTotalPrice()}€</Text>
        </View>

      </View>
    );
  }
}
mapStateToProps = (state) => {
  const {days} = state.cigarette;
  return {days};
}
export default connect(mapStateToProps,{})(Header);
