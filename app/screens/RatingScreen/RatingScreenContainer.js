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
import { Rating, AirbnbRating } from 'react-native-ratings';
import {EmojiFeedback} from 'app/components/EmojiFeedback';

const left = require('app/assets/images/left.png');
const right = require('app/assets/images/right.png');

const { width, height } = Dimensions.get('window');

import BasicScreenView from "../BasicScreen/BasicScreenView";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default (RatingScreen = props => {
  let { stateKey, required } = props;

  class RatingScreenContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        input: this.props.screenProps.getSetting(stateKey)
      };
    }

    _renderForm = () => {
      return (
        <EmojiFeedback
          count={5}
          reviews={props.reviews}
          images={props.images}
          defaultRating={this.state.input || null}
          size={verticalScale(42)}
          onFinishRating={this.ratingCompleted}
          style={{ paddingVertical: 5, marginTop: 5 }}
        />
      );
    };

    ratingCompleted = (rating) => {
      this.setState({ input: rating });
    };

    _onPress = values => {
      Keyboard.dismiss();
      let txt = '';
      if (this.state.input) {
        const index = parseInt(this.state.input) - 1;
        txt = props.reviews[index];
      }
      this.props.screenProps.saveSetting(stateKey, this.state.input, txt, () =>
        this.props.screenProps.next()
      );
    };

    _onLeftPress = values => {
      Keyboard.dismiss();
      let txt = '';
      if (this.state.input) {
        const index = parseInt(this.state.input) - 1;
        txt = props.reviews[index];
      }
      this.props.screenProps.saveSetting(stateKey, this.state.input, txt, () =>
        this.props.screenProps.back()
      );
    };

    _onRightPress = values => {
      Keyboard.dismiss();
      let txt = '';
      if (this.state.input) {
        const index = parseInt(this.state.input) - 1;
        txt = props.reviews[index];
      }
      this.props.screenProps.saveSetting(stateKey, this.state.input, txt, () =>
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

  return RatingScreenContainer;
});

const styles = StyleSheet.create({
});
