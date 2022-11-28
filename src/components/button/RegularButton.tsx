/** @format */

import React from 'react'
import type { FC } from 'react'
import styled from 'styled-components/native'
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native'

// components
import { Colors } from '../../constants/Colors'
import Spacing from '../../constants/Spacing'

import RegularText from '../text/RegularText'

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${Colors.primary};
  padding: ${Spacing * 2}px;
  border-radius: ${Spacing * 2}px;
`
type ButtonProps = {
  btnStyles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
  onPress: ((event: GestureResponderEvent) => void) | undefined
  children?: React.ReactNode
}

/**
 *
 * @param props btnStyles, onPress, textStyles, children
 * @returns {React.ComponentElement} return regularText in ButtonView
 */
const RegularButton: FC<ButtonProps> = (props) => {
  return (
    <ButtonView style={props.btnStyles} onPress={props.onPress}>
      <RegularText textStyles={props.textStyles}>{props.children}</RegularText>
    </ButtonView>
  )
}

export default RegularButton
