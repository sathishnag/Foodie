import {StyleSheet, TouchableOpacity, Text, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS, FONTS, SIZES } from '../constants';

const CustomButton = function(props) {
  const style = {};
  if (props.type === 'fill') {
    style.backgroundColor = 'white';
    style.width = "95%";
    style.alignItems = 'center';
    style.borderWidth = 0;
    style.height=60;
    style.borderRadius = SIZES.radius;
  } else if (props.type === 'default') {
    style.borderColor = COLORS.primary;
  } else if (props.type === 'link') {
    style.borderWidth = 0;
  }
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.buttonStyle,
        style,
        props.buttonStyle,
        props.disabled ? styles.disabled : {},
        FONTS.body4
      ]}>
      <Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent:'center',
    paddingLeft: 22,
    paddingRight: 22,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom:8, 
    marginRight:22
  },
  textStyle: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'red',
  },
  disabled: {
    opacity: 0.5,
  },
});

CustomButton.defaultProps = {
  type: 'default',
  disabled: false,
};

export default CustomButton;
