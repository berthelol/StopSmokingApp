import React, {Component} from 'react';
import { ScrollView,Platform} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles from '../styles/index.style';
import {connect} from 'react-redux';
import {Spinner} from './common';

class MyCarousel extends Component {

  getSlides() {
    const {days} = this.props;
    if (days=='') {
      return false;
    }
    console.log(days);
    return days.map((day, index) => {
      return (<SliderEntry key={`carousel-entry-${index}`} {...day}/>);
    });
  }

  showCarousel(){
    const {days} = this.props;
    if (days=='') {
      return <Spinner size={Platform.OS === 'ios'?'large':125} style={{marginTop:50}} />;
    }
    return <Carousel sliderWidth={sliderWidth} itemWidth={itemWidth} firstItem={days.length-1} inactiveSlideScale={0.94} inactiveSlideOpacity={0.6} enableMomentum={false} containerCustomStyle={styles.slider} contentContainerCustomStyle={styles.sliderContainer} showsHorizontalScrollIndicator={false} snapOnAndroid={true} removeClippedSubviews={false}>
      {this.getSlides()}
    </Carousel>;
  }

  render() {
    return (
      <ScrollView //style={styles.scrollview}}
     indicatorStyle={'white'} scrollEventThrottle={200}>
     {this.showCarousel()}
      </ScrollView>
    );
  }
}
mapStateToProps = (state) => {
  const {days} = state.cigarette;
  return {days};
}

export default connect(mapStateToProps, {})(MyCarousel);
