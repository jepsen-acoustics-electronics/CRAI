import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Animated, Keyboard, StyleSheet, Text, TouchableOpacity, View, Dimensions, UIManager } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const {height, width} = Dimensions.get('window');


//const ButtonView = ({ onButtonPressed, text, buttonStyle, buttonTextStyle, disableButton }) => {

export class ButtonView extends React.Component {
  constructor(props) {
    super(props);
    const {onButtonPressed, text, buttonStyle, buttonTextStyle, disableButton} = this.props;
    this.paddingInput = new Animated.Value(height/4);
  }

  componentDidMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleKeyboardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    Animated.timing(this.paddingInput, {
      duration: event.duration,
      toValue: keyboardHeight + 10,
    }).start();
  };

  handleKeyboardDidHide = () => {

  };

  render() {
    const showDisableButtonStyle = this.props.disableButton ? styles.buttonDisabledStyle : {};

    return (
      <TouchableOpacity onPress={this.props.onButtonPressed} activeOpacity={0.7}>
        <Animated.View style={[{marginBottom: this.paddingInput}, styles.bottomButtonStyle, this.props.buttonStyle, showDisableButtonStyle]}>
          <Text style={[styles.bottomButtonTextStyle, this.props.buttonTextStyle]}>
            {this.props.text}
          </Text>
        </Animated.View>

      </TouchableOpacity>

    );

  }
}

ButtonView.propTypes = {
  text: PropTypes.string,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  disableButton: PropTypes.bool,
  onButtonPressed: PropTypes.func,
};

ButtonView.defaultProps = {
  text: 'NEXT'
};


const styles = StyleSheet.create({
  bottomButtonStyle: {
    backgroundColor: '#FFFFFF',
    height: verticalScale(60),
    width: 0.85 * width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  bottomButtonTextStyle: {
    fontSize: verticalScale(26),
    fontWeight: "700",
    color: "#359946",
    fontFamily: 'AvenirNext-Regular',
  },
  buttonDisabledStyle: {
    opacity: 0.40
  }
});

export default ButtonView;
