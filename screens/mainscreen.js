import React, {Component} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import BreatheCircle from './circle';
import { connect } from "react-redux";
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const style=StyleSheet.create({
  text: {justifyContent: 'center',
        fontSize: 80,
        fontWeight: 'bold',
        color: 'white',
      },
});

class HomeScreen extends React.Component { 
  constructor(props)
    {super(props);
      this.soundObject = new Audio.Sound();
    }
    stopSound = async () => {	
      try {
        await this.soundObject.stopAsync(require('../assets/sounds/PAPPSOUND.mp3'));	
      }catch (error) {
        try{
          await this.soundObject.loadAsync(require('../assets/sounds/PAPPSOUND.mp3'));
          await this.soundObject.stopAsync(require('../assets/sounds/PAPPSOUND.mp3'));	
        } catch(error){
        console.log('couldnt pause sound', error)
        }
      }
  }	
  playSound = async () => {	
    try{	
      await this.soundObject.playAsync(require('../assets/sounds/PAPPSOUND.mp3'));	
    } catch (error) {
      try{
      await this.soundObject.loadAsync(require('../assets/sounds/PAPPSOUND.mp3'));
      await this.soundObject.playAsync(require('../assets/sounds/PAPPSOUND.mp3'));	
      } catch (error) {
      console.log('couldnt play sound', error)
        }
      }
    }

  createSound = async()=> {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/PAPPSOUND.mp3'));
      await soundObject.setVolumeAsync(0.3)
      await soundObject.setIsLoopingAsync(true)
    } catch (error) {	
        console.log("sound couldn't load", error)	
        }
    if (this.props.sound==true){	
      this.playSound();	
    } else {	
      this.stopSound();	
    }
  }

    componentDidMount(){
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    this.createSound()
}

  componentWillReceiveProps(nextProps){
    if (nextProps.sound==true){	
      this.playSound();	
    } else {	
      this.stopSound();	
    }
  }
    render() {
        return(
            <LinearGradient colors={['#6ECCDF', '#086C76']} style={{flex: 1 }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Feather onPress={() => this.props.navigation.navigate('Settings')} name='settings' size={35} color='white' style={{alignSelf: 'flex-end', padding: 15, paddingTop: 30, opacity: 0.8}}></Feather>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <BreatheCircle in={this.props.in} hold={this.props.hold} out={this.props.out}></BreatheCircle>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                <Text style={
                  {color: '#F87883', padding: 15, fontSize: 20, fontWeight: 'bold'}
                  }>Swipe for useful information >> </Text>
              </View>
            </LinearGradient>
        )
    }
  };

  const mapStateToProps = state => {
    return {
      in: state.in,
      hold: state.hold,
      out: state.out,
      sound: state.sound,
      contacts: state.contacts,
    };
  };

export default connect(
  mapStateToProps
)(HomeScreen);