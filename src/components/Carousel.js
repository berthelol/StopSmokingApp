import React, {Component} from 'react';
import { ScrollView,Platform,View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, slideHeight,itemWidth} from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import SliderLoadRest from './SliderLoadRest';
import styles from '../styles/index.style';
import {connect} from 'react-redux';
import {Spinner} from './common';
import {AsyncStorage} from 'react-native';
import {Config} from '../Config';

class MyCarousel extends Component {

  getSlides() {
    const {days,slides_limit} = this.props;
    if (days=='') {
      return false;
    }
    let sliderEntry = [];
    days.sort(function(a, b) {
      return parseFloat(a.day_id) - parseFloat(b.day_id);
    });
    days.forEach((day,index)=>{
      if((days.length-index<slides_limit)||slides_limit==null)
      {
        sliderEntry.push(
          <SliderEntry timePerCigarette={Config.lifetimePerCigarette} key={`carousel-entry-${index}`} {...day} />
        );
      }
      if((days.length==index+1)&&slides_limit!==null)
        sliderEntry.unshift(
          <SliderLoadRest key={"loadRest"}/>
        )
    });
    return sliderEntry;
  }

  showCarousel(){
    const {days} = this.props;
    if (days=='') {
      return <Spinner size='large' style={{marginTop:50}} />;
    }
    return <Carousel  sliderWidth={sliderWidth} itemWidth={itemWidth} firstItem={days.length-1} inactiveSlideScale={0.94} inactiveSlideOpacity={0.6} enableMomentum={false} containerCustomStyle={styles.slider} contentContainerCustomStyle={styles.sliderContainer} showsHorizontalScrollIndicator={false} snapOnAndroid={true} removeClippedSubviews={false}>
      {this.getSlides()}
    </Carousel>;
  }

  render() {
    return (
        <ScrollView scrollEnabled={ false }
       indicatorStyle={'white'} scrollEventThrottle={200}>
       {this.showCarousel()}
        </ScrollView>
    );
  }
}
mapStateToProps = (state) => {
  const {days,slides_limit} = state.cigarette;
  return {days,slides_limit};
}

export default connect(mapStateToProps, {})(MyCarousel);
