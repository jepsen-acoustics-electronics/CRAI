import React, { Component } from 'react';
import { Image, Text, Dimensions, KeyboardAvoidingView, StyleSheet, View, TouchableOpacity } from 'react-native';
import HeaderText from './HeaderText';
import HeaderImage from './HeaderImage';
import isUrl from 'is-url';
import EStyleSheet from 'react-native-extended-stylesheet';

import ButtonView from './ButtonView';

const { width, height } = Dimensions.get("window");

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const NavBar = ({
    left,
    right,
    logo,
    onLeftPressed,
    onRightPressed,

    leftStyle,
    rightStyle
}) => {

    _renderNavItem = (item, side) => {
        const BUTTON_SIZE = 100;
        let sideStyle;

        if (side === 'left') {
            sideStyle = StyleSheet.flatten([styles.left, leftStyle]);
        } else {
            sideStyle = StyleSheet.flatten([styles.right, rightStyle]);
        }

        if (!item) return null;
        //return <View style={sideStyle} />

        if (typeof item === 'object') {
            return <HeaderImage header={item} style={{width: 50, height: 50}} />;
        }
        else if (typeof item === 'number' || (typeof item === 'string' && isUrl(item))) {
            return <HeaderImage image={{item}} style={{width: 50, height: 50, ...sideStyle}} />;
        }
        else {
            return <HeaderText text={item} style={{ textAlign: 'center', color: '#fff', ...styles.navText, ...sideStyle}} />;
        }
    }

    return (
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={onLeftPressed} activeOpacity={0.2}>
                {_renderNavItem(left, 'left')}
            </TouchableOpacity>
          </View>
          <View style={styles.middleContainer}>
            {(logo) &&
              <Image source={logo} style={[styles.image]} />
            }
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity style={{flex: 1}} onPress={onRightPressed} activeOpacity={0.2}>
                {_renderNavItem(right, 'right')}
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = EStyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 40,
      paddingHorizontal: 0,
      marginTop: 10,
      marginBottom: 40,
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    middleContainer: {
      marginTop: 20
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    left: {
      alignSelf: 'flex-start',
      marginLeft: 10,
      marginTop: 37
    },
    right: {
      alignSelf: 'flex-end',
      marginTop: 37,
      marginRight: 10
    },
    image: {
      backgroundColor: 'transparent',
      resizeMode: 'contain',
      maxWidth: 100,
      marginTop: 20
    },
    navText: {
      fontSize: '100rem',
    }
});

export default NavBar;
