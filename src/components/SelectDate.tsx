/** @format */

import { View, Text, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BlurView as _BlurView } from 'expo-blur'
import SmallText from './text/SmallText'
import Spacing from '../constants/Spacing'
import Colors from '../constants/Colors'
import { DrawerItem } from '@react-navigation/drawer'
import RegularText from './text/RegularText'
import { MotiView as _MotiView, useAnimationState } from 'moti'

type ItemView = {
  text: SelectedProps
  index?: number
  textStyle?: StyleProp<TextStyle>
}
const MotiView: React.FC<ItemView> = ({ text, index = 0, textStyle }) => {
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  })
  return (
    <_MotiView state={animationState} delay={index * 50} style={styles.blurView}>
      <RegularText textStyles={[styles.textStyle, textStyle]}>The {text}</RegularText>
    </_MotiView>
  )
}

export enum SelectedProps {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}
const orderDate = [SelectedProps.WEEK, SelectedProps.DAY, SelectedProps.MONTH, SelectedProps.YEAR]

export type selectDateProps = {
  isSelected: SelectedProps
}
const SelectDate: React.FC<selectDateProps> = (props) => {
  const [nowDisplayDate, setDisplayDate] = useState<SelectedProps>(SelectedProps.WEEK)
  const [isShowDisplay, setIsShowDisplay] = useState(false)

  const onPress = useCallback((selectOption: SelectedProps) => {
    setDisplayDate(selectOption)
    setIsShowDisplay((isShowDisplay) => !isShowDisplay)
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(nowDisplayDate)}>
        <MotiView text={nowDisplayDate} textStyle={{ color: Colors.yellow }} />
      </TouchableOpacity>
      {isShowDisplay &&
        orderDate.map((date, index) => {
          if (date == nowDisplayDate) return
          return (
            <TouchableOpacity key={index.toString()} onPress={() => onPress(date)}>
              <MotiView index={index} key={index.toString()} text={date} textStyle={{ color: Colors.gray }} />
            </TouchableOpacity>
          )
        })}
    </View>
  )
}

export default SelectDate

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: Spacing * 1,
    display: 'flex',
    flexDirection: 'column',
  },
  blurView: {
    width: Spacing * 12,
    height: Spacing * 4,
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.text,
  },
})
