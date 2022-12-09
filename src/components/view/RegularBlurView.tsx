/** @format */

import { BlurTint, BlurView } from 'expo-blur'
import React, { ReactNode } from 'react'

import { StyleSheet, StyleProp, ViewStyle } from 'react-native'

type BlurViewProps = {
  intensity?: number
  dark?: boolean
  blurViewStyle?: StyleProp<ViewStyle>
  children?: ReactNode
}

const RegularBlurView: React.FC<BlurViewProps> = (props) => {
  const tint: BlurTint = props.dark ? 'dark' : 'light'
  const intensity: number = props.intensity ? props.intensity : 50
  return (
    <BlurView tint={tint} intensity={intensity} style={[styles.regularBlurView, props.blurViewStyle]}>
      {props.children}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  regularBlurView: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default RegularBlurView
