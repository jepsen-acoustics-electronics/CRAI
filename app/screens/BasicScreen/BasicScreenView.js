import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { BackgroundView, ButtonView, FixedHeightView, HeaderText, FlexHeightView, NavBar } from '../../components'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default BasicScreenView = ({
    backgroundStyle,
    backgroundImage,
    overlayImage,
    left,
    right,
    logo,

    header,
    headerHeight,
    headerWidth,
    headerContainerStyle,
    headerStyle,

    middle,
    middleContainerStyle,
    middleStyle,

    footer,
    footerHeight,
    footerWidth,
    footerContainerStyle,
    footerStyle,

    hideButton,
    disableButton,
    onPress,
    buttonText,

    screenProps,
    navigation,
    onLeftPressed,
    onRightPressed,
}) => {

    _press = () => {
        if (disableButton) return;

        if (onPress) return onPress();
        if (screenProps.next) return screenProps.next();
    };

    _leftPressed = () => {
        //if (onPress) onPress();
        if (onLeftPressed) return onLeftPressed();
        screenProps.back();
    };

    _rightPressed = () => {
        //if (onPress) onPress();
        if (onRightPressed) return onRightPressed();
        screenProps.next();
    };

    return (
        <BackgroundView style={backgroundStyle} backgroundImage={backgroundImage} overlayImage={overlayImage}>
            <NavBar 
                onLeftPressed={_leftPressed}
                onRightPressed={_rightPressed}
                left={left}
                right={right}
                logo={logo}/>
            <FixedHeightView height={headerHeight} width={headerWidth} containerStyle={headerContainerStyle} style={headerStyle}>
              {header}
            </FixedHeightView>

            <FlexHeightView containerStyle={middleContainerStyle} style={middleStyle}>
                {middle}
            </FlexHeightView>

            <FixedHeightView height={footerHeight} width={footerWidth} containerStyle={footerContainerStyle} style={footerStyle}>
              {footer}
            </FixedHeightView>

            {!hideButton && 
                <ButtonView
                    disableButton={disableButton}
                    onButtonPressed={_press}
                    text={buttonText} />
            }
        </BackgroundView>
    )
}