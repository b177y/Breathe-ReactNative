import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import call from 'react-native-phone-call';

class ShowContact extends React.Component{
    constructor(props) {
        super(props);
        this.phoneCall = this.phoneCall.bind(this);
      }
    componentDidMount(){
        console.log("showing contact:", this.props.name, this.props.number)
    }
    phoneCall () {
        console.log('props', this.props)
        const args = {
            number: this.props.number,
            prompt: true
          }
        call(args).catch(console.error)
    }
    render(){
        return(
            <TouchableOpacity onPress={this.phoneCall} style={{backgroundColor: 'white', borderRadius: 5, opacity: 0.8, flexDirection: 'row', padding: 10, margin: 10, alignContent: 'center'}}>
                <Text style={{flex: 3, paddingRight: 10}}>{this.props.name}</Text>
                <Text style={{flex: 3}}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}
export default ShowContact