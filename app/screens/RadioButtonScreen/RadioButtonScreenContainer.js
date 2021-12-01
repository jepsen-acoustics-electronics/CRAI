import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
  Dimensions
} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const { width, height } = Dimensions.get('window');

import BasicScreenView from "../BasicScreen/BasicScreenView";

const left = require('app/assets/images/left.png');
const right = require('app/assets/images/right.png');


export default (RadioButtonScreen = props => {
  let { stateKey, required } = props;

  class RadioButtonScreenContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        input: this.props.screenProps.getSetting(stateKey)
      };
    }

    _renderForm = () => {
      return (
        <View style={styles.component}>
          <RadioForm
            formHorizontal={true}
            animation={true}
            selectedButtonColor={'#000000'}
          >
            {/* To create radio buttons, loop through your array of options */}
            {props.radioProps.map((obj, i) => {
              return (
              <RadioButton labelHorizontal={false} key={i} >
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.input === obj.value}
                  onPress={this.onPress}
                  borderWidth={1}
                  selectedButtonColor={'#000000'}
                  buttonInnerColor={'#fd9b03'}
                  buttonOuterColor={'#fff'}
                  buttonSize={20}
                  buttonOuterSize={40}
                  buttonWrapStyle={{marginBottom: 10, marginLeft: 10}}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={this.onPress}
                  labelStyle={{fontSize: 12, fontWeight: '500', color: '#ffffff'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
              );
            })}
          </RadioForm>
        </View>
      );
    };

    onPress = (value, index) => {
      this.setState({ input: value });
    };

    _onPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input || 'N/A', () =>
        this.props.screenProps.next()
      );
    };

    _onLeftPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input || 'N/A', () =>
        this.props.screenProps.back()
      );
    };

    _onRightPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input || 'N/A', () =>
        this.props.screenProps.next()
      );
    };


    _stateValid = () => {
      const input = this.state.input;
      if (!required) {
        return true;
      }
      const valid = input ? true : false;
      return valid;
    };

    render() {
      const showBack = props.showBack;
      const showNext = this._stateValid() && props.showNext;
      const logo = props.logo;

      return (
        <BasicScreenView
          {...props}
          {...this.props}
          onPress={this._onPress}
          onLeftPressed={this._onLeftPress}
          onRightPressed={this._onRightPress}
          middle={this._renderForm()}
          left={showBack ? left : false}
          right={showNext ? right : false}
          logo={logo}
          disableButton={!this._stateValid()}
        />
      );
    }
  }

  return RadioButtonScreenContainer;
});

const styles = StyleSheet.create({
  component: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    left: -7
  },
  inputTextStyle: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "500",
    textAlign: "center",
    width: width-100,
    borderBottomWidth: 0.6,
    borderBottomColor: "#ffffff"
  }
});
