import {StyleSheet, TouchableOpacity, Text, ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import colors from '../common/colors';
import { COLORS, SIZES } from '../constants';

const CustomButton = function(props) {
  const style = {};
  if (props.type === 'fill') {
    style.backgroundColor = COLORS.primary;
    style.width = "100%";
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
      ]}>
      <Text style={[styles.textStyle, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'flex-start'
  },
  textStyle: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: COLORS.primary,
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
