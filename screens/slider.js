import React from 'react';
import {Text, View} from 'react-native';
import Slider from 'react-native-slider';
import { connect } from "react-redux";

class SliderComponent extends React.Component{
    constructor(props){
        super(props)

        this.state={
            sliderValue: this.props.val,
            type: this.props.sliderText,
        }
    }

    render(){
        return(
            <View style={{alignContent: 'center', flexDirection: 'row', padding: 10, justifyContent: 'center'}}>
                <Text style={{color: 'white', flex: 1, alignContent: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.type}</Text>
                <Slider style={{width: 300, padding: 30, flex: 4}} thumbTintColor='white' step={1} value={this.state.sliderValue} minimumValue={this.props.min} maximumValue={this.props.max} minimumTrackTintColor='#F87883' onValueChange={val => {
                    this.setState({sliderValue: val})
                }
            }
            onSlidingComplete={ val =>
                this.props.changeSliderValue(this.state.type, this.state.sliderValue)
            }
            >
                    </Slider>
                <Text style={{color: 'white', flex: 1, alignContent: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 'bold'}}>{this.state.sliderValue}</Text>
            </View>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      changeSliderValue: (type, value) => { 
        dispatch({type: type, value: value});
      }
    }
  }

const mapStateToProps = state => {
    return {
      in: state.in,
      hold: state.hold,
      out: state.out,
    };
  };

  
  export default connect(mapStateToProps, mapDispatchToProps)(SliderComponent);