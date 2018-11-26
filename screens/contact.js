import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import Dialog from "react-native-dialog";

class ContactSettings extends React.Component {
    state={
        dialogVisible: false
    }

    showDialogue = () => {
        this.setState({dialogVisible: true});
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false });
      };
     
      handleDelete = () => {
        this.setState({ dialogVisible: false });
        this.props.deleteContact('DELCONTACT', this.props.name)
      };
    render(){
        let deleteIcon;
        if (this.props.deletable){
            deleteIcon=<MaterialCommunityIcons size={25} color='#FF5867'  name='minus-circle-outline' onPress={val => this.showDialogue()} trackColor={'#F87883'} style={{flex: 1}}></MaterialCommunityIcons>
        } else {
            deleteIcon=<View style={{flex: 1}} />
        }
        
        return(
            <View style={{backgroundColor: 'white', borderRadius: 5, opacity: 0.8, flexDirection: 'row', marginBottom: 10, padding: 10, alignContent: 'center', alignSelf: 'stretch'}}>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Delete Contact?</Dialog.Title>
                    <Dialog.Description>
                        This action cannot be undone!
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Delete" onPress={this.handleDelete} />
                </Dialog.Container>
                <Text style={{flex: 3}}>{this.props.name}</Text>
                <Text style={{flex: 3}}>{this.props.number}</Text>
                {deleteIcon}
            </View>       )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      deleteContact: (type, value) => { 
        dispatch({type: type, value: value});
      }
    }
  }
  export default connect(null, mapDispatchToProps)(ContactSettings);