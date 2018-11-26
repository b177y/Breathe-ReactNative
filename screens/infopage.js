import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';
import { LinearGradient } from 'expo'; 
import { Ionicons } from '@expo/vector-icons';
import ShowContact from "./showContact";
import {connect} from 'react-redux';

class infoPage extends React.Component {
  state={
  advice: ['Panic attacks typically last for between 5 and 20 minutes', 'Panic attacks are not dangerous - they do not cause physical harm', "Don't fight it, stay where you are", "Breathe slowly and deeply - in through the nose, out through the mouth", 'Remind yourself it will pass', "Remember it isn't life threatening"],
    moreInfo: ["A panic attack is a feeling of sudden and intense anxiety. Panic attacks can also have physical symptoms, including shaking, feeling disorientated, nausea, rapid, irregular heartbeats, dry mouth, breathlessness, sweating and dizziness.", ""],
  }
  componentWillReceiveProps(nextProps){
    console.log('infoPage receiving props:', nextProps.contacts)
  }
    render() {
      const advice=this.state.advice.map(i => <Text key={i} style={{color: 'white'}}>{i}{'\n'}</Text>);
      const moreInfo=this.state.moreInfo.map(i => <Text key={i} style={{color: 'white'}}>{i}{'\n'}</Text>);
        return(
          <LinearGradient colors={['#6ECCDF', '#086C76']} style={{ alignItems: 'center', flex: 2 }}>
            <View style={{paddingTop: 30, padding: 10}}>
              <Ionicons size={35} color='white' name='ios-return-left'onPress={() => this.props.navigation.navigate('Home')}></Ionicons>
              <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Give this to someone you trust to help calm you down</Text>
              <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>This person is having a panic attack!</Text>
            </View>
            <ScrollView style={{paddingTop: 10}}>
            <View style={{backgroundColor: '#72D0E3', flexDirection: 'row', paddingTop:10, alignSelf: 'stretch'}}>
              <View style={{flex: 1, margin: 10, flex: 1}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Quick Info & Advice</Text>
                <Text style={{color: 'white'}}>{advice}</Text>
              </View>
              <View style={{flex: 1}}>{this.props.contacts.map((i, index) => {return <ShowContact name={i.name} number={i.number} key={index}/>})}</View>
            </View>
            <View style={{padding: 10}}>
              <Text style={{color: 'white', fontSize: 25}}>More information about panic attacks</Text>
              <Text>{moreInfo}</Text>
            </View>
            </ScrollView>              
        </LinearGradient>
        )
    }
  };

  const mapStateToProps = state => {
    return {
      contacts: state.contacts
    };
  };

export default connect(mapStateToProps)(infoPage);