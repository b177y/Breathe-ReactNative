import React, {Component} from 'react';
import {Switch, Text, View, ScrollView} from 'react-native';
import { LinearGradient } from 'expo'; 
import { Ionicons } from '@expo/vector-icons';
import SliderComponent from "./slider";
import {connect} from 'react-redux';
import ContactSettings from "./contact";
import Dialog from "react-native-dialog";

class settingsPage extends React.Component {
  state = {
    dialogVisible: false,
    name: '',
    number: '',
    errorMessage: 0
  };
  // componentWillMount(){
  //   this.props.callDispatch('RESET', 'nothing');
  // }
  showDialog = () => {
    if (this.props.contacts.length<=4){
    this.setState({ dialogVisible: true });
    }
  };
 
  handleCancel = () => {
    this.setState({dialogVisible: false, name: '', number: '', errorMessage: 0})
  };

  handleSubmit = () => {
    if (this.state.name != '' && this.state.number != ''){
    this.setState({ dialogVisible: false });
    newContact={
      name: this.state.name,
      number: this.state.number
    }
    this.props.callDispatch('NEWCONTACT', newContact);
    console.log('created contact', newContact);
    this.setState({name: '', number: '', errorMessage: 0})
    console.log('new contacts in props settings page:', this.props.contacts)
  }else{
    this.setState({ errorMessage: 1 });
  }
  };
    render() {
        return(
          <LinearGradient colors={['#6ECCDF', '#086C76']} style={{ alignItems: 'flex-start', flex: 1 }}>
          <View>
            <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Add Contact</Dialog.Title>
              <Dialog.Description>
                Add a contact to be displayed on the info page (e.g. therapist, relative, friend)
              </Dialog.Description>
              <Dialog.Description style={{color: 'red', opacity: this.state.errorMessage}}>Do not leave fields blank</Dialog.Description>
              <Dialog.Input label='Name' onChangeText={name => this.setState({name})} value={this.state.name}></Dialog.Input>
              <Dialog.Input keyboardType='number-pad' label='Number' onChangeText={number => this.setState({number})} value={this.state.number}></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
              <Dialog.Button label="Submit" onPress={this.handleSubmit} />
            </Dialog.Container>
          </View>
            <View style={{paddingTop: 30, padding: 10}}>
              <Ionicons size={35} color='white' name='ios-return-left' onPress={() => this.props.navigation.navigate('Home')} style={{}}></Ionicons>
              <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Settings</Text>
            </View>
            <ScrollView style={{alignSelf: 'stretch', alignContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', padding: 10}}>Customise Timings</Text>            
              <SliderComponent sliderText="In" min={1} max={7} val={this.props.in}/>
              <SliderComponent sliderText="Hold" min={0} max={5} val={this.props.hold}/>
              <SliderComponent sliderText="Out" min={2} max={9} val={this.props.out}/>
              {/* <View style={{alignContent: 'center', flexDirection: 'row', paddingRight: 10, paddingLeft: 10, marginBottom: 30, marginTop: 30, justifyContent: 'center'}}>
                <Text style={{color: 'white', flex: 1, alignContent: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 'bold'}}>Sound</Text>
                <Switch value={this.props.sound} onValueChange={val => this.props.callDispatch('SOUND', val)} trackColor={'#F87883'}></Switch>
              </View> */}
              <View style={{alignContent: 'center', paddingRight: 10, paddingLeft: 10,  justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={{color: 'white', flex: 1, alignContent: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 'bold'}}>Contacts</Text>
                <Ionicons size={40} color={(this.props.contacts.length>4) ? 'grey' : '#FF5867'} name='ios-add-circle-outline' onPress={() => this.showDialog()}></Ionicons>
              </View>
              <Text style={{color: '#d8dfd6', flex: 1, padding: 10, fontSize: 20, fontWeight: 'bold', opacity: (this.props.contacts.length>4) ? 1 : 0}}>Maximum 3 contacts can be added!</Text>
              <View style={{alignContent: 'center',  padding: 15, paddingRight: 10, paddingLeft: 10,  justifyContent: 'center'}}>
                <View style={{alignSelf: 'stretch'}}>{this.props.contacts.map((i, index) => {return <ContactSettings name={i.name} number={i.number} deletable={i.deletable} key={index}/>})}</View>
              </View>          
              </ScrollView>
          </LinearGradient>
        )
    }
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      callDispatch: (type, value) => { 
        dispatch({type: type, value: value});
      }
    }
  }
  const mapStateToProps = state => {
    return {
      in: state.in,
      hold: state.hold,
      out: state.out,
      sound: state.sound,
      contacts: state.contacts,
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(settingsPage);