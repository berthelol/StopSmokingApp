import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage} from 'react-native';
import styles from '../styles/index.style';
import MapView from 'react-native-maps';
import {Config,format_time} from '../Config';

export default class DayDetail extends Component {
  state = {
    currentRegion: null,
    markers: [],
    minute_separator: Config.minute_separator
  }
  componentWillMount() {
    AsyncStorage.getItem('minute_separator').then((minute_separator) => {
      this.setState({minute_separator: parseInt(minute_separator)});
    });
    this.createDataSource(this.props.day);
  }
  componentDidMount() {
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = 0.0421;
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    }, (error) => {
      console.log(error.message);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
    this.createMarkers(this.props.day.cigarettes);
  }
  componentWillReceiveProps(nextProps) {
    //next props are the the new set of props that will be render
    //this.props are still the old set of props
    this.createDataSource(nextProps);
  }
  createDataSource({cigarettes}) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(cigarettes);
  }
  createMarkers(cigarettes) {
    const markers = cigarettes.map((cigarette) => {
      return {
        id: cigarette.cigarette_id,
        latlng: {
          latitude: cigarette.lat,
          longitude: cigarette.lng
        },
        title: '' + cigarette.cigarette_id,
        description: ""
      };
    });
    this.setState({markers: markers})
  }
  renderTimeBetweenCigarette(previous, actual) {
    if (previous == null)
      return <Text style={[styles.cigaretteDetailListViewItemText,{
        color: 'transparent'
      }]}>+00h00</Text>;

    const time_difference = (actual.time - previous.time) / 60;
    const variance = time_difference - this.state.minute_separator;

    if (variance > 0) {
      return <Text style={[styles.cigaretteDetailListViewItemText,{
        color: 'green'
      }]}>+{format_time(time_difference*60)}</Text>
    }
    if (variance > -30 && variance < 0) {
      return <Text style={[styles.cigaretteDetailListViewItemText,{
        color: 'orange'
      }]}>+{format_time(time_difference*60)}</Text>
    }
    if (variance <= -30) {
      return <Text style={[styles.cigaretteDetailListViewItemText,{
        color: 'red'
      }]}>+{format_time(time_difference*60)}</Text>
    }
  }
  renderRow(cigarette, sectionId, rowId) {
    rowId = parseInt(rowId);
    return (
      <View style={styles.cigaretteDetailListViewItem}>
        <Text style={styles.cigaretteDetailListViewItemText}>#{rowId + 1}</Text>
        <Text style={styles.cigaretteDetailListViewItemText}>
          {format_time(cigarette.time)}
        </Text>
        {this.renderTimeBetweenCigarette(rowId != 0
          ? this.props.day.cigarettes[rowId - 1]
          : null, cigarette)}
      </View>
    )
  }

  render() {
    const {date} = this.props.day;
    return (
      <View>
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} style={styles.cigaretteDetailListView} renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}/>
        {/* <MapView style={styles.map} initialRegion={this.state.currentRegion} showsUserLocation={true}>
          {this.state.markers.map(marker => (<MapView.Marker key={marker.id} coordinate={marker.latlng} title={marker.title} description={marker.description}/>))}
        </MapView> */}
      </View>
    )
  }
};
