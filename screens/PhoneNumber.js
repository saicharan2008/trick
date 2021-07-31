import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as Font from 'expo-font';
import firebase from 'firebase';
import AppLoading from 'expo-app-loading';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      phone:'',
      verificationCode:'',
      userID:'',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
validatePhoneNumber=()=>{
  var regexp=/^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
  return regexp.test(this.state.phone)
}

handlesendcode=()=>{
  if(this.validatePhoneNumber()){
firebase.auth().signInWithPhoneNumber(this.state.phone)
.then(conformResult=>{
  this.setState({
    conformResult
  })})
  .catch(error=>{
    alert(error.message)
    console.log('error')
  })
  } else {
    alert('invalid Phone Number')
  }
}

changePhoneNumber=()=>{
  this.setState({
    conformResult:null,
    verificationCode:''
  })
}

handleVerifyCode=()=>{
  const{conformResult,verificationCode}=this.state
  if(verificationCode.lenght===6){
    conformResult.conform(verificationCode).then(user=>{
      this.setState({
        userID:user.uid
      })
      alert('verified ${userID:user.uid}')
    }).catch(error=>{
      alert(error.message)
    console.log('error')
    })
  } else {
    alert('Please enter a 6 digit code')
  }
}

renderConfromationCodeView=()=>{
  return (
    <View>
      <TextInput placeholder='verication code' value={this.state.verificationCode}
     keyboardType='numeric' onChangeText={verificationCode=>{
      this.setState({verificationCode})}} maxLength={6}></TextInput>
      <TouchableOpacity onPress={this.handleVerifyCode}>
     <Text>Verify Code</Text>
      </TouchableOpacity>
      </View>
  )
}

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>HEY</Text>
          </View>
          <Image source={require('../pam.png')} style={styles.appIcon}></Image>
          <TextInput placeholder="Phone Number" style={styles.textInput}></TextInput>
          <TouchableOpacity style={styles.otp}>SEND OTP</TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
  },
  appIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
     marginTop: -80,
     borderRadius:4,
     backgroundColor: 'white',
  },
  otp: {
    margin: 50,
    backgroundColor: 'white',
    color: 'black',
    borderRadius:4,
    width:100,
    height:70,
    textAlign:'center',
    textDecorationLine:'underline',
    fontSize:30,
  },
  text: {
    fontSize: 50,
    marginTop: -150,
    lineHeight: 50,
    color:'black',
     borderRadius:4,
     backgroundColor: 'white',
  },
  textInput:{
    width:200,
    height:30,
    marginTop:30,
    color:'white',
    textDecorationColor:'dark',
    borderRadius:4,
     backgroundColor: 'white',
  }
});
