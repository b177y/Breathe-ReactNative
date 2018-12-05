import React, {Component} from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo'; 
import { connect } from "react-redux";

class BreatheCircle extends React.Component {
    state = {
          circleAnimation: new Animated.Value(0.6),
          holdAnimation: new Animated.Value(0),
          inhaleAnimation: new Animated.Value(0),
          exhaleAnimation: new Animated.Value(0),
      }
  
  breathAnimation = 
      Animated.loop(
        Animated.sequence([
        Animated.timing(this.state.inhaleAnimation, {toValue: 1, duration:10}),
        Animated.timing(this.state.circleAnimation, {toValue: 1, duration:this.props.in*1000}),
        Animated.timing(this.state.inhaleAnimation, {toValue: 0, duration:10}),
        Animated.timing(this.state.holdAnimation, {toValue: 1, duration:10}),
        Animated.timing(this.state.holdAnimation, {toValue: 0, duration:10, delay: this.props.hold*1000}),
        Animated.timing(this.state.exhaleAnimation, {toValue: 1, duration:10}),
        Animated.timing(this.state.circleAnimation, {toValue: 0.6, duration:this.props.out*1000}),
        Animated.timing(this.state.exhaleAnimation, {toValue: 0, duration:10}),
  ]))
  

  componentDidMount(){
    this.animateCircle();
  }
  componentWillUnmount(){
    this.breathAnimation.stop();
  }

  animateCircle(){
      this.breathAnimation.start();
  }
  
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    // this.breathAnimation.stop()
    // this.breathAnimation.reset()
    console.log('restarting animation with in: ', nextProps.in, ' hold: ', nextProps.hold, ' out: ', nextProps.out)
    newAnimation = 
      Animated.loop(
        Animated.sequence([
        Animated.timing(this.state.inhaleAnimation, {toValue: 1, duration:10}),
        Animated.timing(this.state.circleAnimation, {toValue: 1, duration:nextProps.in*1000}),
        Animated.timing(this.state.inhaleAnimation, {toValue: 0, duration:10}),
        Animated.timing(this.state.holdAnimation, {toValue: 1, duration:10}),
        Animated.timing(this.state.holdAnimation, {toValue: 0, duration:10, delay: nextProps.hold*1000}),
        Animated.timing(this.state.exhaleAnimation, {toValue: 1, duration:10}),
        Animated.timing(this.state.circleAnimation, {toValue: 0.6, duration:nextProps.out*1000}),
        Animated.timing(this.state.exhaleAnimation, {toValue: 0, duration:10}),
  ]))
    this.breathAnimation.stop()
    this.breathAnimation.reset()
    newAnimation.start()
  }

  
    render(){
      const {circleAnimation, holdAnimation, inhaleAnimation, exhaleAnimation} = this.state;
      return(
          <View style={{alignItems: 'center'}}>
           <Animated.View style={{
            width: 350,
            height: 350,
            borderRadius: 200,
            transform: [ {scale: circleAnimation} ]
          }}>
            <LinearGradient colors={['rgb(255, 206, 224)', 'rgb(248, 120, 131)']} style={{ alignItems: 'center', justifyContent: 'center', flex: 1, borderRadius: 200}}>
              <Animated.Text style={{
                position: 'absolute',
                justifyContent: 'center',
                fontSize: 80,
                fontWeight: 'bold',
                color: 'white',
                opacity: holdAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                                  },)
                                }}>Hold</Animated.Text>
              <Animated.Text style={{
                position: 'absolute',
                justifyContent: 'center',
                fontSize: 80,
                fontWeight: 'bold',
                color: 'white',
                opacity: inhaleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                                  },)
                                }}>Inhale</Animated.Text>
              <Animated.Text style={{
                position: 'absolute',
                justifyContent: 'center',
                fontSize: 80,
                fontWeight: 'bold',
                color: 'white',
                opacity: exhaleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                                  },)
                                }}>Exhale</Animated.Text>
            </LinearGradient>
          </Animated.View>
        </View>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      in: state.in,
      hold: state.hold,
      out: state.out,
    };
  };

export default connect(
  mapStateToProps
)(BreatheCircle);