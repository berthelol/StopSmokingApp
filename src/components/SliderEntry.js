import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';
import {Config} from '../Config';

export default class SliderEntry extends Component {

    /*static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        illustration: PropTypes.string,
        even: PropTypes.bool
    };*/

    render () {
        const { date,cigarettes } = this.props;
        const dateformat = new Date(date);

        return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.slideInnerContainer}
              onPress={() => { alert(`You've clicked `); }}
              >
                <View style={styles.calContainer}>
                  <Text style={styles.calTextString}>{Config.dayNames[dateformat.getDay()]}</Text>
                  <Text style={styles.calTextNumber}>{dateformat.getDate()}</Text>
                  <Text style={styles.calTextString}>{Config.monthNames[dateformat.getMonth()]}</Text>
                </View>
                <View style={styles.dataContainer}>
                  <View style={styles.dataItemContainer}>
                    <Text style={styles.dataItemContainerTitle} >Total dépensés</Text>
                    <Text style={styles.subtitle} >5€</Text>
                  </View>
                  <View style={styles.dataItemContainer}>
                    <Text style={styles.dataItemContainerTitle} >Total fumées</Text>
                    <Text style={styles.subtitle} >{cigarettes.length}</Text>
                  </View>
                  <View style={styles.dataItemContainer}>
                    <Text style={styles.dataItemContainerTitle} >Total vie perdue</Text>
                    <Text style={styles.subtitle} >5 heures</Text>
                  </View>
                </View>
            </TouchableOpacity>
        );
    }
}
