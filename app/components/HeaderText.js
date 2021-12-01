import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import TextFit from './TextFit';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

const HeaderText = ({ text, height, width, style }) => {
  return (
    <TextFit height={verticalScale(height) || verticalScale(20) } width={width} style={[styles.textStyle]}>{text}</TextFit>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'AvenirNext-Regular',
  }
});

export default HeaderText;
