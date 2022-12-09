/** @format */

import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import type { FC, ReactNode } from 'react'

type LoadingViewProps = {
  viewStyle?: ViewStyle
  textStyle?: TextStyle
  text?: string
}
const LoadingView: FC<LoadingViewProps> = ({
  viewStyle,
  textStyle,
  text = 'Load the fonts...',
}) => {
  return (
    <View style={[styles.container, viewStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  )
}

export default LoadingView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { fontSize: 25, fontWeight: '700', textAlign: 'center', color: 'white' },
})
