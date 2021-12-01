import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Dimensions, StyleSheet, View, ViewPropTypes, Text } from 'react-native';
import { HeaderText, HeaderImage } from '.'
import isUrl from 'is-url'

const FixedHeightView = ({children, height, width, containerStyle, style}) => {
  renderHeader = () => {
    if (typeof children === 'object') {
      return children;
    }
    else if (typeof children === 'number' || (typeof children === 'string' && isUrl(children))) {
      return <HeaderImage image={children} style={style} />
    }
    else {
      return <HeaderText height={height} width={width} text={children} style={style} />
    }
  }
  return (
    <View style={[styles.headerStyle, containerStyle]}>
      {renderHeader()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: 5,
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 5
  }
});

export default FixedHeightView;
