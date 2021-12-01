import React, { Component } from 'react';
import { Image, Dimensions, KeyboardAvoidingView, StyleSheet, View, ImageBackground } from 'react-native';
const { width, height } = Dimensions.get("window");

import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import { Header } from 'react-navigation';

const BackgroundView = ({
  children,
  style,
  backgroundImage,
  overlayImage
}) => {

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={(-Header.HEIGHT+-110)} style={[styles.container, style]} behavior={"size"}>
      <ImageBackground source={backgroundImage} style={styles.container}>
        <Image source={overlayImage} resizeMode='contain' style={[styles.overlay]} />
        {children}
      </ImageBackground>
    </KeyboardAvoidingView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: undefined,
    height: height,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

export default BackgroundView;
