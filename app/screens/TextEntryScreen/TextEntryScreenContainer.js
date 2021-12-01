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

import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');
const left = require('app/assets/images/left.png');
const right = require('app/assets/images/right.png');

import BasicScreenView from "../BasicScreen/BasicScreenView";

export default (TextEntryScreen = props => {
  let { stateKey, validation, required } = props;

  class TextEntryScreenContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        input: this.props.screenProps.getSetting(stateKey)
      };
    }

    _renderForm = () => {
      return (
          <TextInput
            style={[ {}, {fontSize: this.state.fontSize, ...styles.inputTextStyle} ]}
            adjustsFontSizeToFit={true}
            autoCapitalize={ validation === 'email' ? 'none': 'words'}
            value={this.state.input}
            onChangeText={this.onChange}
            clearButtonMode={"while-editing"}
            keyboardType={validation === 'numeric' ? 'numeric' : 'ascii-capable'}
            returnKeyType={"next"}
            {...props}
          />
      );
    };

    onChange = data => {
      this.setState({ input: data });
    };

    _onPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input, () =>
        this.props.screenProps.next()
      );
    };

    _onLeftPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input, () =>
        this.props.screenProps.back()
      );
    };

    _onRightPress = values => {
      Keyboard.dismiss();
      this.props.screenProps.saveSetting(stateKey, this.state.input, () =>
        this.props.screenProps.next()
      );
    };

    _stateValid = () => {
      const input = this.state.input;

      if (!required) {
        return true;
      }

      let valid = input && input.length > 0 ? true : false;
      if (!valid) return false;

      if (validation) {
        switch (validation) {
          case 'email':
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if (reg.test(input) === false) {
              return false;
            }
          default:
            break;
        }
      }
      return valid;
    };

    render() {
      const showBack = props.showBack;
      const showNext = this._stateValid() && props.showNext;
      const logo = props.logo;
      const validation = props.validation;
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

  return TextEntryScreenContainer;
});

const styles = StyleSheet.create({
  inputTextStyle: {
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "center",
    width: 0.85 * width,
    borderBottomWidth: 0.6,
    borderBottomColor: "#ffffff",
  }
});
