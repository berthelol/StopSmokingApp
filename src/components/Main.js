import React ,{Component} from 'react';
import MyCarousel from './Carousel';
import {View, Text,Image,TouchableOpacity,Modal,AsyncStorage} from 'react-native';
import styles from '../styles/index.style';
import {CardSection,Button} from './common';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import Header from './Header';

class Main extends Component{
  state={modalShow:false};
  onModalShow(){
    this.setState({'modalShow':!this.state.modalShow});
  }
  onLogout(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
  AsyncStorage.multiSet([['user', ""], ['password', ""]], (err)=>console.log(err));
  Actions.auth();
}, function(error) {
  // An error happened.
});
    this.setState({'modalShow':!this.state.modalShow});
  }
  render(){
    return (
      <View style={styles.container}>
        <Header onModalShow={this.onModalShow.bind(this)}/>
        <TouchableOpacity  style={styles.addCigBtnStyle}>
          <Text style={styles.addCigBtnTextStyle}>+</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Example 1</Text>
        <Text style={styles.subtitle}>No momentum | Scale | Opacity</Text>
          <MyCarousel />
          <Modal
            visible={this.state.modalShow}
            transparent
            animationType="fade"
            onRequestClose={()=>{}}
            >
            <View style={styles.modal}>
              <CardSection>
                <Button onPress={this.onLogout.bind(this)}>Logout</Button>
              </CardSection>
            </View>
          </Modal>
      </View>
    );
  }
};

export default Main;
