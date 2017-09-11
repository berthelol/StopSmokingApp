import React, {Component} from 'react';
import {View,Text,Image} from 'react-native';
import styles from '../styles/index.style';
import {Config,format_time} from '../Config';

 export default class Header extends Component {
  renderTotalLifeLost(){
    return format_time(this.props.cigarettes.length*Config.lifetimePerCigarette*60);
  }
  renderTotalCigarettesSmoked(){
    return this.props.cigarettes.length;
  }
  renderTotalPrice(){
    let cigarettePrice=0;
      this.props.cigarettes.forEach(function(cigarette){
        cigarettePrice+=cigarette.price;
    });
    return cigarettePrice.toFixed(2);
  }
  renderPlaceSmoked(place){
    let placeCount=0;
    this.props.cigarettes.forEach(function(cigarette){
      if(cigarette.label==place)
      placeCount++;
    });
    return placeCount;
  }
  renderLowerFooter(){
    const {color} = this.props;

    if(this.props.lowerFooter)
    return(
      <View style={[styles.footerContainerCard,{marginTop:60}]}>
        <View style={{marginLeft:20}}>
          <Image
            source={require('../images/Home.png')}
            style={[styles.footerIcon]}
          />
          <Text style={[styles.subtitle,color]} >{this.renderPlaceSmoked("Home")}</Text>
        </View>

        <View>
          <Image
            source={require('../images/Work.png')}
            style={styles.footerIcon}
          />
          <Text style={[styles.subtitle,color]} >{this.renderPlaceSmoked("Work")}</Text>
        </View>

        <View style={{marginRight:25}}>
          <Image
            source={require('../images/Other.png')}
            style={styles.footerIcon}
          />
          <Text style={[styles.subtitle,color]} >{this.renderPlaceSmoked("Other")}</Text>
        </View>
      </View>
    );
  }
  render(){
    const {lowerFooter,color,mainTextStyles,sideTextStyles,mainContainerStyle} = this.props;
    if(this.props.cigarettes==''||this.props.cigarettes.length==0) return <View></View>
    return (
      <View style={[styles.footerContainer,mainContainerStyle]}>
        <View style={styles.footerContainerCard}>
          <View>
            <Text style={[styles.footerTitle,color,sideTextStyles]} >Vie perdue</Text>
            <Text style={[styles.subtitle,color,sideTextStyles]} >{this.renderTotalLifeLost()}</Text>
          </View>

          <View style={{paddingBottom:15,paddingLeft:5,paddingRight:5}}>
            <Text style={[styles.footerTitle,{fontSize:14},color,mainTextStyles]} >Total fumées</Text>
            <Text style={[styles.subtitle,{fontSize:20},color,mainTextStyles]} >{this.renderTotalCigarettesSmoked()}</Text>
          </View>

          <View>
            <Text style={[styles.footerTitle,color,sideTextStyles]} >Argent perdu</Text>
            <Text style={[styles.subtitle,color,sideTextStyles]} >{this.renderTotalPrice()}€</Text>
          </View>
        </View>
        {this.renderLowerFooter()}
      </View>
    );
  }
}
