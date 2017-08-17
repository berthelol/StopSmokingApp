import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';
import {Config} from '../Config';
import {Actions} from 'react-native-router-flux';

export default class SliderEntry extends Component {

    goToDayDetail(){
      Actions.dayDetail({day:this.props});
    }

    format_time(time){
      time*=this.props.timePerCigarette;
      return ''+parseInt(time/60)+'h'+parseInt(time%60)+'m';
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

                  <View style={styles.dataItemContainer}>
                    <Text style={styles.dataItemContainerTitle} >Total vie perdue</Text>
                    <Text style={styles.subtitle} >{this.format_time(cigarette_amount)}</Text>
                  </View>

                  <View style={styles.dataItemContainer}>
                    <Text style={styles.dataItemContainerTitle} >Total fumées</Text>
                    <Text style={styles.subtitle} >{cigarette_amount}</Text>
                  </View>

                  <View style={styles.dataItemContainer}>
                    <Text style={styles.dataItemContainerTitle} >Total dépensés</Text>
                    <Text style={styles.subtitle} >{cigarette_amount_price.toFixed(2)}€</Text>
                  </View>

                </View>
            </TouchableOpacity>
        );
    }
}
