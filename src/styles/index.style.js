import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  //  background1: 'hsl(15, 55%, 50%)',
  background1: '#808080',
  background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerGreatings: {
    alignSelf: 'flex-start',
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
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
  navigationBarStyle: {
    backgroundColor: '#5aa0cc',
    borderBottomColor: 'transparent',
    borderBottomWidth: 65
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between'
  },
  modalcenter: {
    backgroundColor: 'rgba(127,127,127,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between'
  },
  addCigBtnStyle: {
    //flex:1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  addCigBtnIconStyle: {
    width: 45,
    height: 45
  },
  settingsIcon: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight: 15
  },
  deleteModal: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  pickerLabel: {
    marginTop: 5,
    marginBottom: 15,
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16
  },
  picker: {
    marginRight: 20,
    marginLeft: 20
  },
  cigaretteDetailListView: {
    alignSelf: 'center',
    height: 150,
    marginTop: 20
  },
  map: {
    marginTop:25,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
