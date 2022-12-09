/** @format */

import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import type { FC } from 'react'
import { Colors } from '../constants/Colors'
import Font from '../constants/Font'
import RegularText from './text/RegularText'

type LoadingViewProps = {
  viewStyle?: ViewStyle
  textStyle?: TextStyle
  text?: string
}
const LoadingView: FC<LoadingViewProps> = ({ viewStyle, textStyle, text = 'Load the fonts...' }) => {
  return (
    <View style={[styles.container, viewStyle]}>
      <RegularText textStyles={[styles.text, textStyle]}>{text}</RegularText>
    </View>
  )
}

export default LoadingView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: Font.juaRegular,
  },
})
