import React, {Component} from 'react';
import {View,Text,ListView} from 'react-native';
import styles from '../styles/index.style';
import MapView from 'react-native-maps';

export default class DayDetail extends Component {
  componentWillMount(){
    this.createDataSource(this.props.day);
  }
  componentWillReceiveProps(nextProps){
    //next props are the the new set of props that will be render
    //this.props are still the old set of props
    this.createDataSource(nextProps);
  }
  createDataSource({cigarettes}){
    const ds =  new ListView.DataSource({
      rowHasChanged : (r1, r2) => r1!== r2
    });
    this.dataSource = ds.cloneWithRows(cigarettes);
  }
  renderRow(cigarette,sectionId,rowId){
    function convertNumberToTime(time){
      hours = Math.floor(time / 3600);
      time %= 3600;
      minutes = Math.floor(time / 60);
      return hours+"h"+minutes;
    }
    return (
      <View style={{flexDirection:'row'}}>
        <Text style={{fontWeight: 'bold'}}>#{++rowId}</Text>
        <Text> {convertNumberToTime(cigarette.time)} </Text>
      </View>
    )
  }

  render(){
    const {date} = this.props.day;
    return(
      <View>
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} style={styles.cigaretteDetailListView}/>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
    )
  }
};
