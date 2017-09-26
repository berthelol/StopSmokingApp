import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';
import {Config} from '../Config';
import {Actions} from 'react-native-router-flux';
import Footer from './Footer';

export default class SliderEntry extends Component {

    goToDayDetail(){
      //sort by time
      Actions.dayDetail({day:this.props});
    }

    render () {
        const { date,cigarettes } = this.props;
        const dateformat = new Date(date);
        const cigarette_amount=cigarettes.length;
        let cigarette_amount_price = 0 ;
        cigarettes.forEach(function(cigarette){
          cigarette_amount_price+=cigarette.price;
        });
        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={this.goToDayDetail.bind(this)}
              >
                <View style={styles.calContainer}>
                  <Text style={styles.calTextString}>{Config.dayNames[dateformat.getDay()]}</Text>
                  <Text style={styles.calTextNumber}>{dateformat.getDate()}</Text>
                  <Text style={styles.calTextString}>{Config.monthNames[dateformat.getMonth()]}</Text>
                </View>
                <View style={styles.dataContainer}>
                  <Footer lowerFooter={false} mainContainerStyle={{marginBottom:25}} color={{color:'rgba(127,127,127,0.90)'}} mainTextStyles ={{fontSize: 13}} sideTextStyles={{fontSize: 11}} cigarettes={cigarettes} />
                </View>
            </TouchableOpacity>
        );
    }
}
