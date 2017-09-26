import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/SliderEntry.style';
import {connect} from 'react-redux';
import {changeSlidesLimit} from '../actions';

class SliderLoadRest extends Component {
  onSliderLimitChange(){
    this.props.changeSlidesLimit(null);
  }
  render() {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.loadRest} onPress={this.onSliderLimitChange.bind(this)}>
        <Image source={require('../images/loadRest.png')} style={styles.loadRestIcon}/>
        <Text style={styles.loadRestText}>Charger le reste des jours</Text>
      </TouchableOpacity>
    );
  }
}
export default connect(null,{changeSlidesLimit})(SliderLoadRest);
