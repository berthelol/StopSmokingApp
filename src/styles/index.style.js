import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: 'hsl(15, 55%, 50%)',
  background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1
  },
  colorsContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row'
  },
  color1: {
    flex: 1,
    backgroundColor: colors.background1
  },
  color2: {
    flex: 1,
    backgroundColor: colors.background2
  },
  scrollview: {
    flex: 1,
    paddingTop: 50
  },
  title: {
    marginTop: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  slider: {
    marginBottom: 30
  },
  sliderContainer: {},
  navBar: {
    backgroundColor: colors.background1
  },
  barButtonIconStyle: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    marginTop: 20
  },
  navigationBarStyle: {
    backgroundColor: '#5aa0cc',
    borderBottomColor: 'transparent',
    borderBottomWidth: 65
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  addCigBtnStyle:{
    //flex:1,
    alignSelf:'center',
    backgroundColor:"#FFF",
    borderColor:"#007aff",
    borderRadius:100,
    borderWidth:1,
    marginLeft:5,
    marginRight:5,
    padding:20,
    paddingRight:27,
    paddingLeft:27
  },
  addCigBtnTextStyle:{
  alignSelf:'center',
  color:"#007aff",
  fontSize:30
  }
});
