/** @format */

import { BlurTint, BlurView } from 'expo-blur'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import Spacing from '../../constants/Spacing'

import { StyleSheet, StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

type WideSpacingViewProps = {
  viewStyles?: StyleProp<ViewStyle>
  children?: ReactNode
}

const WideSpacingView: React.FC<WideSpacingViewProps> = (props) => {
  return <View style={[styles.rowView, props.viewStyles]}>{props.children}</View>
}

const styles = StyleSheet.create({
  rowView: {
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default WideSpacingView
