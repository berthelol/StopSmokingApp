import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage,Image} from 'react-native';
import styles from '../styles/index.style';
import {Config,format_time} from '../Config';
import Footer from './Footer';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';

class DayDetail extends Component {
  state = {
    currentRegion: null,
    markers: [],
    minute_separator: Config.minute_separator
  }
  componentWillMount() {
    this.createDataSource(this.props.day);
    AsyncStorage.getItem('minute_separator').then((minute_separator) => {
      if(minute_separator!=null)
        this.setState({minute_separator: parseInt(minute_separator)});
    });
  }
  componentDidMount() {
    //ZOOM
    const LATITUDE_DELTA = 0.03358723958820065;
    const LONGITUDE_DELTA = 0.04250270688370961;

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
    cigarettes.sort(function(a, b) {
      return parseFloat(a.time) - parseFloat(b.time);
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
        title: format_time(cigarette.time)
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
  renderIconLabel(cigarette){
    switch (cigarette.label) {
      case "Home":
        return <Image
          source={require('../images/Home.png')}
          style={styles.dayDetailIcon}
        />
        break;
      case "Work":
      return <Image
        source={require('../images/Work.png')}
        style={styles.dayDetailIcon}
      />
        break;
      case "Other":
      return <Image
        source={require('../images/Other.png')}
        style={styles.dayDetailIcon}
      />
        break;
      default:

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
          {this.renderIconLabel(cigarette)}
      </View>
    )
  }
  renderDate(){
    const date = new Date(this.props.day.date);
    return `${Config.dayNames[date.getDay()]} ${date.getDate()} ${Config.monthNames[date.getMonth()]}`;
  }

  renderHomeMarker(){
    const {lat,lng,address} = this.props.user.home_address;
    const latlng = {latitude:lat,longitude:lng};
    return <MapView.Marker image={require("../images/Home-64.png")} key={"home"} coordinate={latlng} title={"Home"} description={address}/>
  }

  renderWorkMarker(){
    const {lat,lng,address} = this.props.user.work_address;
    const latlng = {latitude:lat,longitude:lng};
    return <MapView.Marker image={require("../images/Work-64.png")} key={"work"} coordinate={latlng} title={"Work"} description={address}/>
  }

  render() {
    return (
      <View>
        <Text style={styles.dayDetailDateHeader} >{this.renderDate()}</Text>
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} style={styles.cigaretteDetailListView} renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}/>
        <Footer lowerFooter sideTextStyles={{fontSize:12}} mainContainerStyle={{marginTop:20}} color={{color:'rgba(127,127,127,0.90)'}} cigarettes={this.props.day.cigarettes}/>
        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={this.state.currentRegion} showsUserLocation={true} fitToElements={true}>
            {this.state.markers.map(marker => (<MapView.Marker key={marker.id} coordinate={marker.latlng} title={marker.title} />))}
            {this.renderWorkMarker()}
            {this.renderHomeMarker()}
          </MapView>
        </View>
      </View>
    )
  }
};

mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user};
}

export default connect(mapStateToProps,{})(DayDetail);
