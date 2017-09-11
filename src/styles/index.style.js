import {StyleSheet} from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: 'hsl(15, 55%, 50%)',
  background1: '#808080',
  background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
  //Common
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
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  //Login & registration
  loginTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    //fontStyle: 'italic'
  },
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  },
  loginSeparator: {
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  loginSeparatorText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  //Header
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
  settingsIcon: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginRight: 15
  },
  cigaretteOffsetTextOutput:{
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  cigaretteOffsetSlider:{
    marginLeft:50,
    marginRight:50
  },
  //Body
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
  addCigBtnStyle: {
    //flex:1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  addCigBtnIconStyle: {
    width: 45,
    height: 45,
  },
  lungsIcon:{
    width: 20,
    height: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop:10
  },
  //Settings
  modalborder: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1
  },
  modalcenter: {
    backgroundColor: 'rgba(127,127,127,0.80)',
    flex: 5,
  //  borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden'
  },
  saveButton: {
    marginRight: 60,
    marginLeft: 60,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  deleteModal: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 20
  },
  logoutContainerModal: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 10
  },
  logoutModal: {
    width: 30,
    height: 30,
    alignItems: 'center',
    marginTop:10
  },
  logoutTextModal: {
    color: '#AB0926',
    alignItems: 'center'
  },
  pickerLabel: {
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 15,
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontWeight: "bold"
  },
  picker: {
    marginRight: 20,
    marginLeft: 20
  },
  settingInput: {
    paddingTop: 15,
    paddingBottom: 20,
    justifyContent: 'flex-start',
    marginLeft: 15
  },
  settingInputLabel: {
    marginTop: 5,
    marginBottom: 5,
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    fontWeight: "bold"
  },
  settingInputText:{
    color:'rgba(255, 255, 255, 0.85)'
  },
  infoBoxTextinput:{
    color: '#3e4347',
    marginTop:10,
    fontSize:12
  },
  loadingIcon: {
    width: 15,
    height: 15,
    alignSelf:'center',
    marginTop:10
  },
  //Day Detail
  dayDetailDateHeader:{
    marginTop: 15,
    backgroundColor: 'transparent',
    color: 'rgba(127,127,127,0.90)',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  cigaretteDetailListView: {
    alignSelf: 'center',
    height: 150,
    marginTop: 20,
    width: 250
  },
  cigaretteDetailListViewItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex:1
  },
  cigaretteDetailListViewItemText: {
    alignSelf: 'center',
    width: 80,
    paddingLeft: 10,
    paddingRight: 10
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },
  map: {
    marginTop: 25,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  dayDetailIcon:{
    width:20,
    height:20,
    alignSelf: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop:2,
    marginBottom:2
  },
  //Footer
  footerContainer:{
    //marginTop: 20,
    flexDirection: 'column',
    flex:1,
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  footerContainerCard: {
    //marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1
  },
  footerTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold'
  },
  footerIcon:{
    width: 25,
    height: 25,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});
